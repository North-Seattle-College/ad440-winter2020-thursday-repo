import os
import boto3
import json
import apiGatewayLogger as logger

def main():
  status_code_pattern = {'200': 'Default',
                    '201': 'Created',
                    '204': 'No Content',
                    '400': 'Bad Request',
                    '404': 'Not Found',
                    '403': 'Forbidden',
                    '405': 'Not Allowed',
                    '500': 'Server Error'}
  for status_code, pattern in status_code_pattern.items():
    if pattern.lower() != 'default':
            status_code_pattern[status_code] = '.*' + status_code_pattern[status_code] + '.*'
  logger.generatedDebug('Status Code Keywords', json.dumps(status_code_pattern))
  
  #* set logger
  logger.setLogger('api_gateway_cors_enable.log')
  #* get boto3 client
  client = boto3.client('apigateway')
  
  #* get api key with default to prod
  api_id = GetAPIId()
  #* get a dict of resources for the API {resource_name:resource_id,[methods]}
  resources_dict = GetResources(client, api_id)

  #* if resource does not have OPTIONS method, add OPTIONS to resource for each
  for resource in resources_dict:
    resource_id = resources_dict[resource][0]
    methods = resources_dict[resource][1]
    if 'OPTIONS' not in methods:
      PutOPTIONSMethod(client, api_id, resource_id)
      methods.append('OPTIONS')
      resources_dict[resource][1] = methods

  #* set Response Headers
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
  ACAO_val = "'https://2edusite.com'"
  
  headers_vals = (XRW_val, ACAH_val, ACAO_val)

  method_respPara = {}
  for header in resp_headers_methods:
    method_respPara[header] = True
  print('Method Parameters: ')
  print(method_respPara)
  
  PutCORSResponds(client, api_id, resources_dict, method_respPara, resp_headers_methods, headers_vals, status_code_pattern)
  
  
  
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
      temp_lst = [resource_id, methods]
      resources_dict[resource] = temp_lst
  logger.generatedDebug('API Resource Dictionary', json.dumps(resources_dict))
  return resources_dict

def PutOPTIONSMethod(client, api_id, resource_id):
  logger.runTrace('Create OPTIONS Method for resource', resource_id)

  response_put_option = client.put_method(
    restApiId = api_id,
    resourceId = resource_id,
    httpMethod = 'OPTIONS',
    authorizationType = 'NONE' #NONE for open access, COGNITO_USER_POOLS for cognito
  )
  logger.generatedDebug('OPTIONS Method created', json.dumps(response_put_option))

  response_put_integration = client.put_integration(
    restApiId = api_id,
    resourceId = resource_id,
    httpMethod = 'OPTIONS',
    type = 'MOCK'
  )
  logger.generatedDebug('OPTIONS Integration set type', 'MOCK')

  response_put_method_response = client.put_method_response(
    restApiId = api_id,
    resourceId = resource_id,
    httpMethod = 'OPTIONS',
    statusCode = '200'
  )
  logger.generatedDebug('OPTIONS Method Response set status Code', '200')



def PutCORSResponds(client, api_id, resources_dict, method_respPara, resp_headers_methods, headers_vals, status_code_pattern):
  for resource in resources_dict:
    logger.runTrace('for resource', resource)
    resource_id = resources_dict[resource][0]
    logger.runTrace('resource', resource)

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
      
      #* Get status codes
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

      for status_code in status_codes:
        logger.runTrace('for status code', status_code)
        logger.runTrace('pattern', status_code_pattern[status_code])
        
        #! delete Method Response Headers if there is one
        try:
          response_delete_method = client.delete_method_response(
            restApiId = api_id,
            resourceId = resource_id,
            httpMethod = method,
            statusCode = status_code 
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
            statusCode = status_code
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
        logger.createInfo('Method Response', json.dumps(response_put_method))
        
        #* put Integration Responses Header Mappings
        if status_code_pattern[status_code].lower() == 'default':
          response_put_integration = client.put_integration_response(
            restApiId = api_id,
            resourceId = resource_id,
            httpMethod = method,
            statusCode = status_code,
            responseParameters = integration_respPara
          )
        else:
          response_put_integration = client.put_integration_response(
            restApiId = api_id,
            resourceId = resource_id,
            httpMethod = method,
            statusCode = status_code,
            selectionPattern = status_code_pattern[status_code],
            responseParameters = integration_respPara
          )
        print(response_put_integration)

if __name__ == "__main__":
    main()