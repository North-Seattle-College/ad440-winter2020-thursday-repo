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
  resources_dict = GetResourcesDict(resources)
  logger.generatedDebug('Resource Dictionary', json.dumps(resources_dict))
  
  for id, methods in resources_dict.items():
    method_function_pairs = []
    for method in methods:
      method_function_pair = {}
      function_name = GetFunctionName(client_api, api_id, id, method)
      method_function_pair[method] = function_name
      method_function_pairs.append(method_function_pair)
    resources_dict[id] = method_function_pairs
  logger.generatedDebug('Resource Dictionary with Function Names', json.dumps(resources_dict))
  
def GetResourcesDict(resources):
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

    resources_dict[resource_id] = methods
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
  
  
  

def GetAPIId():
  api_id = input('Enter API Gateway ID (press enter for default): ')
  if api_id == '':
    api_id = 'ez9pmaodek'
  logger.inputTrace('API ID', api_id)
  return api_id

#TODO get boto3 clinet for lambda

#TODO find lambda info for method stage variables
#TODO lambda add permission

if __name__ == "__main__":
    main()