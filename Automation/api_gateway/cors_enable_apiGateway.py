import os
import boto3
import json
import apiGatewayLogger as logger

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

#TODO set logger
logger.setLogger('api_gateway_cors_enable.log')

#TODO get boto3 client
client = boto3.client('apigateway')

def GetAPIId():
  api_id = input('Enter API Gateway ID (press enter for default): ')
  if api_id == '':
    api_id = 'ez9pmaodek'
  logger.inputTrace('API ID', api_id)
  return api_id

#TODO get a dict of resources for the API {resource_name:resource_id,[methods]}
api_id = GetAPIId()

response_get_resources = client.get_resources(
  restApiId=api_id
)
resources = response_get_resources['items']

resources_dict = {}

for resource in resources:
  #print(resource)
  resource_id = resource['id']
  resource_path = resource['path']

  methods = []
  if resource_path != '/': # avoid root path, which don't have methods
    resource_methods = resource['resourceMethods']
  for method in resource_methods:
    methods.append(method)

  resource = resource_path.split('/')
  length = len(resource)
  if length == 3:
    resource = resource[-1].replace('{', '')
    resource = resource.replace('}', '')
  elif length == 4:
    resource = resource[-2].replace('{', '') + '_' + resource[-1]
    resource = resource.replace('}', '')
  elif length == 2 and resource[-1] != '':
    resource = resource[-1]

  if type(resource) == str:
    temp_tuple = (resource_id, methods)
    resources_dict[resource] = temp_tuple
logger.generatedDebug('API Resource Dictionary', json.dumps(resources_dict))

#TODO Response Headers
response_headers = ['X-Requested-With', 'Access-Control-Allow-Headers',
                    'Access-Control-Allow-Origin', 'Access-Control-Allow-Methods']
resp_headers_methods = []
resp_headers_integration = []
for header in response_headers:
  resp_headers_methods.append('method.response.header.'+header)
  resp_headers_integration.append('integration.response.header.'+header)
print('Method Headers:')
print(resp_headers_methods)
print('Integration Headers:')
print(resp_headers_integration)
XRW_val = "'*'"
ACAH_val = "'Content-Type,X-Amz-Date,Authorization,X-Api-Key,x-requested-with'"
ACAO_val = "'*'"

method_respPara = {}
for header in resp_headers_methods:
  method_respPara[header] = True
print('Method Parameters: ')
print(method_respPara)

for resource in resources_dict:
  resource_id = resources_dict[resource][0]
  logger.runTrace('resouce', resource)

  methods = resources_dict[resource][1]
  methods_str = ','.join(methods)
  methods_str = "'" + methods_str + "'"
  logger.runTrace('with methods', methods_str)

  integration_mapping = [XRW_val, ACAH_val, ACAO_val, methods_str]
  print('integration mapping:')
  print(integration_mapping)
  integration_respPara = dict(zip(resp_headers_methods, integration_mapping))
  print('Integration Parameters: ')
  print(integration_respPara)

  
  for method in methods:

    logger.runTrace('for method', method)

    #TODO delete Method Response Headers
    try:
      response_delete_method = client.delete_method_response(
        restApiId = api_id,
        resourceId = resource_id,
        httpMethod = method,
        statusCode = '200',
      )
      print(response_delete_method)
    except:
      logger.runTrace('Method deletion failed', 'Method does not exist')

    #TODO delete Integration Response Headers
    try:
      response_delete_integration = client.delete_integration_response(
        restApiId = api_id,
        resourceId = resource_id,
        httpMethod = method,
        statusCode = '200',
      )
      print(response_delete_integration)
    except:
      print('Integration deletion failed', 'Integration does not exist')


    #TODO put Method Response Headers
    response_put_method = client.put_method_response(
      restApiId = api_id,
      resourceId = resource_id,
      httpMethod = method,
      statusCode = '200',
      responseParameters = method_respPara
    )
    print(response_put_method)
    
    #TODO put Integration Responses Header Mappings
    response_put_integration = client.put_integration_response(
      restApiId = api_id,
      resourceId = resource_id,
      httpMethod = method,
      statusCode = '200',
      responseParameters = integration_respPara
    )
    print(response_put_integration)

