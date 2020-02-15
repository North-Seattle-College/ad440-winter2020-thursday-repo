import os
import boto3
import json
import apiGatewayLogger as logger

def main():
  # set logger
  logger.setLogger('api_gateway_cors_enable.log')
  # get boto3 client
  client = boto3.client('apigateway')
  
  # get api key with default to prod
  api_id = GetAPIId()
  # get a dict of resources for the API {resource_name:resource_id,[methods]}
  resources_dict = GetResources(client, api_id)
 
  # set Response Headers
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
  
  headers_vals = (XRW_val, ACAH_val, ACAO_val)

  method_respPara = {}
  for header in resp_headers_methods:
    method_respPara[header] = True
  print('Method Parameters: ')
  print(method_respPara)
  
  PutCORSResponds(client, api_id, resources_dict, method_respPara, resp_headers_methods, headers_vals)
  
  
  
def GetAPIId():
  api_id = input('Enter API Gateway ID (press enter for default): ')
  if api_id == '':
    api_id = 'ez9pmaodek'
  logger.inputTrace('API ID', api_id)
  return api_id

def GetResources(client, api_id):
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
  return resources_dict

def PutCORSResponds(client, api_id, resources_dict, method_respPara, resp_headers_methods, headers_vals):
  for resource in resources_dict:
    logger.runTrace('for resource', resource)
    resource_id = resources_dict[resource][0]
    logger.runTrace('resouce', resource)

    methods = resources_dict[resource][1]
    methods_str = ','.join(methods)
    methods_str = "'" + methods_str + "'"
    logger.runTrace('with methods', methods_str)
    
    integration_mapping = []
    for header_val in headers_vals:
      integration_mapping.append(header_val)
    integration_mapping.append(methods_str)
    logger.generatedDebug('Integration Mapping', json.dumps(integration_mapping))
    
    integration_respPara = {}
    integration_respPara = dict(zip(resp_headers_methods, integration_mapping))
    logger.generatedDebug('Integration Parameters', json.dumps(integration_respPara))

    
    for method in methods:
      logger.runTrace('for method', method)
      
      #TODO get status codes
      response_get_method = client.get_method(
        restApiId = api_id,
          resourceId = resource_id,
          httpMethod = method
      )
      logger.generatedDebug('Method Detail', json.dumps(response_get_method))
      method_responses = response_get_method['methodResponses']
      logger.runTrace('Method Responses', json.dumps(method_responses))
      status_codes = list(method_responses.keys())
      logger.runTrace('Status Codes', json.dumps(status_codes))
      #! hard coded to 200 only as waiting for API team update integration response selection pattern
      status_codes = ['200']
      
      for status_code in status_codes:
        logger.runTrace('for status code', status_code)
        
        #! delete Method Response Headers if there is one
        try:
          response_delete_method = client.delete_method_response(
            restApiId = api_id,
            resourceId = resource_id,
            httpMethod = method,
            statusCode = status_code, 
          )
          logger.runTrace('Method deletion', json.dumps(response_delete_method))
        except:
          logger.runTrace('Method deletion failed', 'Method does not exist')

        #! delete Integration Response Headers if there is one
        try:
          response_delete_integration = client.delete_integration_response(
            restApiId = api_id,
            resourceId = resource_id,
            httpMethod = method,
            statusCode = status_code,
          )
          logger.runTrace('Integration deletion', json.dumps(response_delete_integration))
        except:
          logger.runTrace('Integration deletion failed', 'Integration does not exist')


        #* put Method Response Headers
        response_put_method = client.put_method_response(
          restApiId = api_id,
          resourceId = resource_id,
          httpMethod = method,
          statusCode = status_code,
          responseParameters = method_respPara
        )
        print(response_put_method)
        
        #* put Integration Responses Header Mappings
        response_put_integration = client.put_integration_response(
          restApiId = api_id,
          resourceId = resource_id,
          httpMethod = method,
          statusCode = status_code,
          responseParameters = integration_respPara
        )
        print(response_put_integration)

if __name__ == "__main__":
    main()