import os
import boto3
# from datetime import datetime
# import ast
import apiGatewayLogger as logger

""" THIS CODE IS USED TO GENERATE feature-sprint STAGE FOR KEY MANAGEMENT API GATEWAY"""

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
  dev_stg_var_val_lst.append('dve-' + val)

stg_vars = dict(zip(stg_var_name_lst, dev_stg_var_val_lst))

api_team_roaster = ['kevin', 'dereje', 'yamato', 'anu', 'deya', 'sojung']

#TODO get stage name
stg_name = input('Enter new feature stage sprint number: ')
try:
  stg_name = int(stg_name)
except:
  logger.inputError('Stage sprint number must be numeric')
  
stg_name = 'feature-sprint' + str(stg_name)
logger.inputTrace('Stage Name', stg_name)

#TODO get api gateway id
api_id = input('Enter API Gateway ID (press enter for default): ')
if api_id == '':
  api_id = 'ez9pmaodek'
logger.inputTrace('API ID', api_id)

#LOG stage name and api gateway id
logger.stageInfo(api_id, stg_name )

#TODO generate list of stage variables

## get stage varibles use for the stage

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

for sv, ln in stg_vars_updated.items():
  logger.generatedDebug('Stage Variables', sv)
  logger.generatedDebug('Lambda Function Name', ln)
  # all none updated stg_vars connect to dev functions
  stg_vars[sv] = ln 

#TODO generate stage description
description = input('Enter description for the new stage: ')
logger.inputTrace('Description', description)

if description == '':
  description = stg_name + 'for Key Management app api development.'

#LOG stage variables and description
logger.generatedDebug('Stage Description',
            description)

#TODO generate list of tags
tags ={
  'Project' : 'KeyManagement',
  'Class' : 'AD440 Th',
  'Purpose' : stg_name.split('-')[0]
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

response = client.create_stage(
  restApiId = api_id,
  stageName = stg_name,
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