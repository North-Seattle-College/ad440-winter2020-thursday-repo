import os
import boto3
import json
import apiGatewayLogger as logger

# constants
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

def main():
  #set logger
  logger.setLogger('api_gateway_lambda_stage_variable_enable.log')
  #set client for api
  client_api = boto3.client('apigateway')
  
  api_id = GetAPIId()
  
  response_get_resources = client_api.get_resources(
    restApiId=api_id
  )
  resources = response_get_resources['items']
  print(resources)
    # this gives {resource_id:({method:functionName}, statement_id, source_arn),()...}
  resources_dict = GetResourcesDict(resources, client_api, api_id)
  logger.generatedDebug('Resource Dictionary with Function Names', json.dumps(resources_dict))

  #  get boto3 clinet for lambda
  client_lambda = boto3.client('lambda')
  
  #TODO lambda add permission
  for method_set in resources_dict.values():
    for method in method_set:
      function_name = method[0].values()[0]
      logger.runTrace('for function', function_name)
      statement_id = method[1]
      source_arn = method[2]
      
      LambdaAddPermission(client_lambda, api_id, function_name, statement_id, source_arn)
  
  
  

def GetResourcesDict(resources, client_api, api_id):
  
  resources_dict = {}
  for resource in resources:
    #print(resource)
    resource_id = resource['id']
    resource_path = resource['path']

    methods = []
    # this gives a dict {resource_id:[(method, statement_id, resource_path),...]}
    if resource_path != '/': # avoid root path, which don't have methods
      resource_methods = resource['resourceMethods']
      for method in resource_methods:
        method_statement_id = ()
        method_statement_id.append(method)
        #T generate pesudo statement id based on the method 
        statement_id = resource_path.replace('/{', '-')
        statement_id = statement_id.replace('}/', '-')
        statement_id = statement_id.replace('_', '-')
        statement_id = statement_id.replace('/', '')
        statement_id = statement_id + '-' + method.lower()
        method_statement_id.append(statement_id)
        method_statement_id.append(resource_path)
        
        methods.append(method_statement_id)
      resources_dict[resource_id] = methods
  logger.generatedDebug('Resource Dictionary', json.dumps(resources_dict))
  
  for id, methods in resources_dict.items():
    value_set = ()
    for method in methods:
      method_function_pair = {}
      function_name = GetFunctionName(client_api, api_id, id, method[0])
      method_function_pair[method[0]] = function_name
      value_set.append(method_function_pair)
      value_set.append(method[1])
      source_arn = GetSourceArn(api_id, function_name, method[0], method[2])
      value_set.append(source_arn)
      logger.runTrace('value set', json.dumps(value_set))
    resources_dict[id] = value_set
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
  return(function_name)

# generate source arn
def GetSourceArn(api_id, function_name, method, resource_path):
  source_arn = function_name.replace('lambda', 'execute-api')
  temp = api_id + '/*/'
  source_arn = source_arn.replace('function:', temp)
  source_arn = source_arn + method
  resource_path = re.sub("\{\w*}\Z",'*', resource_path)
  logger.runTrace('Regex resource path', resource_path)
  source_arn = source_arn + resource_path
  return (source_arn)
  

def LambdaAddPermission(client, api_id, function_name, statement_id, source_arn):
  response = client.add_permission(
    FunctionName = function_name,
    StatementId = statement_id,
    Action = 'lambda:InvokeFunction',
    Principal = 'apigateway.amazonaws.com',
    SourceArn = source_arn
  )

def GetAPIId():
  api_id = input('Enter API Gateway ID (press enter for default): ')
  if api_id == '':
    api_id = 'ez9pmaodek'
  logger.inputTrace('API ID', api_id)
  return api_id


if __name__ == "__main__":
    main()