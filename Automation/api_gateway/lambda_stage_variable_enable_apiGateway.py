import os
import boto3
import re
import json
import apiGatewayLogger as logger

def main():
  #constant
  stg_var_name_lst = ['keybundle_GET',
                    'keybundle_id_DELETE',
                    'keybundle_id_GET',
                    'keybundle_id_PUT',
                    'keyholder_GET',
                    'keyholder_POST',
                    'keyholder_id_DELETE',
                    'keyholder_id_GET',
                    'keyholder_id_PUT',
                    'property_GET',
                    'property_POST',
                    'property_id_DELETE',
                    'property_id_GET',
                    'property_id_PUT',
                    'property_id_keybundle_GET',
                    'property_id_keybundle_POST'
                    ]
  
  api_team_roaster = ['kevin', 'dereje', 'yamato', 'anu', 'deya', 'sojung']
  
  #set logger
  logger.setLogger('api_gateway_lambda_stage_variable_enable.log')
  #set client for api
  client_api = boto3.client('apigateway')
  
  #get API
  api_id = GetAPIId()
  #get feature stage
  isFeature = input('Is this for the feature stage?(y/n) ')
  logger.inputTrace('Is Feature', isFeature)
  if isFeature.lower() ==  'y' or isFeature.lower() ==  'yes':
    feature_funcs = GetFeatureStageFuncs(stg_var_name_lst, api_team_roaster)
    isFeature = True
  else:
    isFeature = False
  
  response_get_resources = client_api.get_resources(
    restApiId=api_id
  )
  resources = response_get_resources['items']
  logger.generatedDebug('Resources of API', json.dumps(resources))
  # this gives {resource_id:[{method:functionName}, statement_id, source_arn],[]...}
  resources_dict = GetResourcesDict(resources, client_api, api_id)
  logger.generatedDebug('Resource Dictionary with Function Names', json.dumps(resources_dict))

  #  get boto3 clinet for lambda
  client_lambda = boto3.client('lambda')
  
  # lambda add permission
  isPandD= input('Is this also for the production and development stages?(y/n) ')
  logger.inputTrace('Is production and development', isPandD)
  function_name = ''
  if isPandD.lower() ==  'y' or isPandD.lower() ==  'yes':
    dev_prod_funcs = GetDevProdStageFunc(stg_var_name_lst)
    
    for method_set in resources_dict.values():
      # print(method_set)
      for method in method_set:
        # print(method)
        logger.runTrace('for method', json.dumps(method))
        for k in method[0].values():
          function_name = k
        # print(function_name)
        logger.runTrace('with stage variable', json.dumps(function_name))
        statement_id = method[1]
        source_arn = method[2]
        
        function_name_part = function_name.split('${stageVariables.')
        # print(function_name_part)
        function_name_part[1] = function_name_part[1].replace('}', '')
        
        # print(dev_prod_funcs.keys())
        if function_name_part[1] in dev_prod_funcs.keys():
          
          for val in dev_prod_funcs[function_name_part[1]]:
            function_name = function_name_part[0] + val.replace('id_','id-')
            logger.runTrace('invoke function', function_name)
            try:
              LambdaRemovePermission(client_lambda, function_name, statement_id) 
            except:
              logger.runTrace('Permission Removal', 'permission not exist')           
            try:
              LambdaAddPermission(client_lambda, api_id, function_name, statement_id, source_arn)
            except:
              print('AddPermission failed for', function_name)
            else:
              print('Development and Production permission successfully added!')
  if isFeature:
    for method_set in resources_dict.values():
      # print(method_set)
      for method in method_set:
        logger.runTrace('for method', json.dumps(method))
        for k in method[0].values():
          function_name = k
        # logger.runTrace('with stage variable', json.dumps(function_name))
        statement_id = method[1]
        source_arn = method[2]
        
        function_name_part = function_name.split('${stageVariables.')
        function_name_part[1] = function_name_part[1].replace('}', '')
        # print(function_name_part)
        # print(feature_funcs.keys())
        if function_name_part[1] in feature_funcs.keys():
          function_name = function_name_part[0] + feature_funcs[function_name_part[1]].replace('-id','_id')
          print(function_name)
          logger.runTrace('invoke function', function_name)
          try:
              LambdaRemovePermission(client_lambda, function_name, statement_id) 
          except:
            logger.runTrace('Permission Removal', 'permission not exist')  
          try:
            LambdaAddPermission(client_lambda, api_id, function_name, statement_id, source_arn)
          except:
            print('AddPermission failed for', function_name)
          else:
              print('Feature permission successfully added!')
  
  

def GetResourcesDict(resources, client_api, api_id):
  
  resources_dict = {}
  for resource in resources:
    #print(resource)
    resource_id = resource['id']
    resource_path = resource['path']

    methods = []
    # this gives a dict {resource_id:[[method, statement_id, resource_path],...]}
    if resource_path != '/': # avoid root path, which don't have methods
      resource_methods = resource['resourceMethods']
      for method in resource_methods:
        method_statement_id = []
        method_statement_id.append(method)
        #T generate pesudo statement id based on the method 
        statement_id = resource_path.replace('/{', '-')
        statement_id = statement_id.replace('}/', '-')
        statement_id = statement_id.replace('}', '-')
        statement_id = statement_id.replace('_', '-')
        statement_id = statement_id.replace('/', '')
        statement_id = statement_id + '-' + method.lower()
        method_statement_id.append(statement_id)
        method_statement_id.append(resource_path)
        
        methods.append(method_statement_id)
      resources_dict[resource_id] = methods
  logger.generatedDebug('Resource Dictionary', json.dumps(resources_dict))
  
  for id, methods in resources_dict.items():
    value_sets = []
    for method in methods:
      if method[0] != 'OPTIONS':
        value_set = []
        method_function_pair = {}
        function_name = GetFunctionName(client_api, api_id, id, method[0])
        method_function_pair[method[0]] = function_name
        value_set.append(method_function_pair)
        value_set.append(method[1])
        source_arn = GetSourceArn(api_id, function_name, method[0], method[2])
        value_set.append(source_arn)
        value_sets.append(value_set)
      logger.runTrace('value set', json.dumps(value_set))
      resources_dict[id] = value_sets
  return (resources_dict)

def GetFunctionName(client_api, api_id, resource_id, http_method):
  logger.runTrace('for resource_method', resource_id + '_' + http_method)
  response = client_api.get_integration(
    restApiId = api_id,
    resourceId = resource_id,
    httpMethod = http_method
  )
  logger.runTrace('get integration', json.dumps(response))
  
  function_name =''
  # avoid errors with option methods
  if response['type'] == 'AWS':
    function_name = response['uri'].rsplit('/', 1)[0]
    function_name = function_name.split('arn:')[2]
    function_name = 'arn:' + function_name
  logger.generatedDebug('Raw Function Name', function_name)
  return(function_name)

# generate source arn
def GetSourceArn(api_id, function_name, method, resource_path):
  source_arn = function_name.replace('lambda', 'execute-api')
  temp = api_id + '/*/'
  source_arn = source_arn.replace('function:', temp)
  source_arn = source_arn.split('${')[0]
  source_arn = source_arn + method
  resource_path = re.sub("\{\w*}",'*', resource_path)
  # logger.runTrace('Regex resource path', resource_path)
  source_arn = source_arn + resource_path
  # print(source_arn)
  logger.generatedDebug('source arn', source_arn)
  return (source_arn)
  

def LambdaAddPermission(client, api_id, function_name, statement_id, source_arn):
  response = client.add_permission(
    FunctionName = function_name,
    StatementId = statement_id,
    Action = 'lambda:InvokeFunction',
    Principal = 'apigateway.amazonaws.com',
    SourceArn = source_arn
  )
  # print(response)
  logger.createInfo('Added Lambda Permission', json.dumps(response))
  
def LambdaRemovePermission(client, function_name, statement_id):
  response = client.remove_permission(
    FunctionName = function_name,
    StatementId = statement_id,
  )
  # print(response)
  logger.createInfo('Removed Lambda Permission', json.dumps(response))

def GetAPIId():
  api_id = input('Enter API Gateway ID (press enter for default): ')
  if api_id == '':
    api_id = 'ez9pmaodek'
  logger.inputTrace('API ID', api_id)
  return api_id

def GetDevProdStageFunc(stg_var_name_lst):
  dev_funcs = []
  for name in stg_var_name_lst:
    method = name.split('_')[-1]
    val = name.replace('_' + method, '-' + method.lower())
    dev_funcs.append('dev-' + val)
    # print(val)
    
  prod_funcs = []
  for name in stg_var_name_lst:
    method = name.split('_')[-1]
    val = name.replace('_' + method, '-' + method.lower())
    prod_funcs.append('prod-' + val)
  
  dev_prod_funcs = list(zip(dev_funcs, prod_funcs))
  dev_prod_stg_funcs = dict(zip(stg_var_name_lst, dev_prod_funcs))
  logger.generatedDebug('Development and Production Stage Functions:', dev_prod_stg_funcs)
  return (dev_prod_stg_funcs)

def GetFeatureStageFuncs(stg_var_name_lst, api_team_roaster):
  # get stage name
  stg_name = input('Enter new feature stage sprint number: ')
  try:
    stg_name = int(stg_name)
  except:
    logger.inputError('Stage sprint number must be numeric')
    
  stg_name = 'feature-sprint' + str(stg_name)
  logger.inputTrace('Stage Name', stg_name)
    
  print ('List of stage variables:')
  length = len(stg_var_name_lst)
  for l in range(length):
    print(str(l+1)+'.'+ stg_var_name_lst[l], end=" ")
  print('')
  stg_vars_get = input('Enter method name/number-responsible party, separate by comma:')
  stg_vars_get = stg_vars_get.replace(" ", "")
  logger.inputTrace('Method Selection', stg_vars_get)
  stg_vars_get = stg_vars_get.split(',')
  stg_vars_updated = {}
  
  for pair in stg_vars_get:
    methodName = ''
    partyName = ''
    pair = pair.split('-')
    if pair[0].isnumeric():
      methodNum = int(pair[0]) - 1
      methodName = stg_var_name_lst[methodNum]
    elif '_' in pair[0]:
      pair[0] = pair[0].lower()
      methodName = pair[0].split('_')
      methodName = pair[0].replace(methodName[-1], methodName[-1].upper())
      if methodName not in stg_var_name_lst:
        logger.inputError('Method name you enter is not a known method')
        os.abort()
    else:
      logger.inputError('Cannot identify the method number/name')
    
    partyName = pair[1]
    if pair[1] not in api_team_roaster:
      logger.warn('The responsible party is not an API team member!' + partyName)
      validation = input('Type the responsible party name again to verify: ')
      if partyName != validation:
        logger.inputError('Validation of responsible party failed!')
        partyName = ''
        os.abort()
    
    lambdaName = stg_name + '-' + partyName + '-' + methodName.lower().replace('_','-')

    stg_vars_updated[methodName] = lambdaName
  
  logger.generatedDebug('Feature Functions', json.dumps(stg_vars_updated))
  
  return (stg_vars_updated)
  

if __name__ == "__main__":
    main()