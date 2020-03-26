import os
import boto3
# from datetime import datetime
# import ast
import apiGatewayLogger as logger

""" THIS CODE IS USED TO GENERATE feature-sprint, dev, or v1 STAGE FOR KEY MANAGEMENT API GATEWAY"""

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

dev_stg_var_val_lst = []

for name in stg_var_name_lst:
  method = name.split('_')[-1]
  val = name.replace('_' + method, '-' + method.lower())
  dev_stg_var_val_lst.append('dev-' + val)

stg_vars = dict(zip(stg_var_name_lst, dev_stg_var_val_lst))

# set logger
logger.setLogger('api_gateway_stage_build.log')

# get stage name
stg_name = input('Enter prod or dev, or feature stage sprint number: ')

if stg_name not in ['prod', 'dev']:
  try:
    stg_name = int(stg_name)
  except:
    logger.inputError('Stage sprint number must be numeric')
    
  stg_name = 'feature-sprint' + str(stg_name)
  logger.inputTrace('Stage Name', stg_name)

stage = stg_name
branch = stage
if stg_name == 'prod':
  ver = input('Enter version number for new production stage: ')
  stage = 'v' + ver
  stg_name = stg_name + '-' + stage

# get api gateway id
api_id = input('Enter API Gateway ID (press enter for default): ')
if api_id == '':
  api_id = 'ez9pmaodek'
logger.inputTrace('API ID', api_id)

#LOG stage name and api gateway id
logger.stageInfo(api_id, stg_name )

# generate list of stage variables

## get stage varibles use for the stage

if branch not in ['dev', 'prod']:
  print ('List of stage variables:')
  length = len(stg_var_name_lst)
  for l in range(length):
    print(str(l+1)+'.'+ stg_var_name_lst[l], end=" ")
  print('')
  stg_vars_get = input('Enter method name/number-responsible party, separate by comma, or type all for all: ')
  stg_vars_get = stg_vars_get.replace(" ", "")
  logger.inputTrace('Method Selection', stg_vars_get)
  if stg_vars_get.lower() == 'all':
    l = len(stg_var_name_lst)
    stg_vars_get = []
    for i in range(l):
      stg_vars_get.append(str(i+1))
  else:
    stg_vars_get = stg_vars_get.split(',')
else:
  l = len(stg_var_name_lst)
  stg_vars_get = []
  for i in range(l):
    stg_vars_get.append(str(i+1))

stg_vars_updated = {}

if stg_vars_get[0].lower() != 'all':
  for var in stg_vars_get:
    methodName = ''
    if var.isnumeric():
      methodNum = int(var) - 1
      methodName = stg_var_name_lst[methodNum]
    elif '_' in var:
      var = var.lower()
      methodName = var.split('_')
      methodName = var.replace(methodName[-1], methodName[-1].upper())
      if methodName not in stg_var_name_lst:
        logger.inputError('Method name you enter is not a known method')
        os.abort()
    else:
      logger.inputError('Cannot identify the method number/name')
    
    lambdaName = stg_name + '-api-' + methodName.lower().replace('_','-')
    lambdaName = lambdaName.replace('_','-')
    lambdaName = lambdaName.replace('-id', '_id')

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

  lambdaName = branch + '-' + methodName.lower().replace('_','-')

  if branch not in ['dev', 'prod']:
    partyName = 'api'
    lambdaName = branch + '-' + partyName + '-' + methodName.lower().replace('_','-')
  
  lambdaName = lambdaName.replace('_','-')
  lambdaName = lambdaName.replace('-id', '_id')


      stg_vars_updated[methodName] = lambdaName

for sv, ln in stg_vars_updated.items():
  logger.generatedDebug('Stage Variables', sv)
  logger.generatedDebug('Lambda Function Name', ln)
  # all none updated stg_vars connect to dev functions
  ln = ln.replace('_','-')
  ln = ln.replace('-id', '_id')
  stg_vars[sv] = ln 

# generate stage description
description = input('Enter description for the new stage: ')
logger.inputTrace('Description', description)

if description == '':
  description = stg_name + 'for Key Management app api development.'

#LOG stage variables and description
logger.generatedDebug('Stage Description',
            description)

# generate list of tags
tags ={
  'Project' : 'KeyManagement',
  'Class' : 'AD440 Th',
  'Purpose' : stg_name
}

print("Auto Generated Tags:")
for n, v in tags.items():
  print(n, ":", v)

tag = input('Enter additional tags (name:value, separated by comma): ')
tag = tag.replace(" ", "")
logger.inputTrace('Additional TAGs', tag)
if tag != '':
  tag_lst = tag.split(',')
  for t in tag_lst:
    t = t.split(':')
    tags[t[0]] = t[1]

for n, v in tags.items():
  logger.generatedDebug('TAGs name', n)
  logger.generatedDebug('TAGs name', v)

#T is cacheClusterEnabled
isCCEnabled = False
isCCEnabled_get = input ('Do you want to enable cache cluster? (y/n) ')
logger.inputTrace('Cache Cluster Enable', isCCEnabled_get)
ccSize_set = 0

if isCCEnabled_get.lower() == 'y' or isCCEnabled_get.lower() == 'yes':
  validation = input('You are about to enable cache cluster, type "cache cluster" to enable: ')
  if validation.lower() == 'cache cluster':
    isCCEnabled = True
    logger.generatedDebug('Cache Cluster', 'True')
    print('Cache Cluster Size: ')
    cacheClusterSize = [.5,1.6,6.1,13.5,28.4,58.2,118,237]
    length = len(cacheClusterSize)
    for l in range(length):
      print(str(l+1)+ '. ' + str(cacheClusterSize[l])+'GB ', end = " ")
    print("")
    ccSize_set = input('Select Cache Cluster Size: ')
    logger.inputTrace('Cache Cluster Size selection', ccSize_set)
    try:
      ccSize_set = int(ccSize_set) - 1      
    except:
      logger.inputError('Cache Cluster Size much be numeric, ')
      os.abort()
    if ccSize_set <= length:
      ccSize_set = str(cacheClusterSize[ccSize_set])
      logger.generatedDebug('Cache Cluster Size', ccSize_set)
  else:
    logger.generatedDebug('Cache Cluster', 'False')
else:
  logger.generatedDebug('Cache Cluster', 'False')

# #TODO is auto depoly? #This is not a option for aws apigateway
# autoDeploy_get = input ('Do you want to auto deploy the stage(y/n): ')
# logger.inputTrace('Auto Deployment', autoDeploy_get)

# if autoDeploy_get.lower() == 'y' or autoDeploy_get.lower() == 'yes':
#   isAutoDeploy = True
#   logger.generatedDebug('Auto Deployment', 'True')
# else:
#   isAutoDeploy = False
#   logger.generatedDebug('Auto Deployment', 'False')

#TODO deploy api gateway stage
# new boto3 client for apigateway
client = boto3.client('apigateway')

# response = client.get_deployments(
#   restApiId = api_id
# )

if isCCEnabled:
  response = client.create_stage(
    restApiId = api_id,
    stageName = stage,
    deploymentId = '0i626r',
    description = description,
    cacheClusterEnabled = isCCEnabled,
    cacheClusterSize = ccSize_set,
    variables = stg_vars,
    tags = tags
  )
else:
  response = client.create_stage(
    restApiId = api_id,
    stageName = stage,
    deploymentId = '0i626r',
    description = description,
    variables = stg_vars,
    tags = tags
  )
#LOG deployment feedback

#TODO generate api.2edusite.com url for the stage
print ('https://api.2edusite.com/' + stg_name)

print(response)

### not easy stringify response dict 
# for n, v in response.items():
#   if type(v) == dict:
#     for name, value in v.items():
#       if type(value) == int or type(value) == float:
#         v[name] = str(value)
#       elif type(value) == dict:
#         for nam, val in value.items():
#           if type(val) == int or type(val) == float:
#             value[nam] = str(val)
#   elif type(v) == datetime:
#     response[n] = v.strftime('%Y-%m-%d, %H:%M:%S')

# print(response)

# resp = ast.literal_eval(response) #this stringify a dictionary
# print(type(resp))
# print(resp)
# #LOG generated stage