import os
import boto3
import json
import apiGatewayLogger as logger

def main():
  #* set logger
  logger.setLogger('api_gateway_intergration_set_stage_variable.log')
  #* get client
  client = boto3.client('apigateway')
  #* get api_id
  api_id = GetAPIId()
  #* get a dict of resources for the API {resource_name:resource_id,[methods]}
  resources_dict = GetResources(client, api_id)
  #* set integration type as lambda
  integration_type = 'AWS'

  requestTemplates = {'application/json': '{\n  "body" : $input.json("$"),\n  "headers": {\n    #foreach($header in $input.params().header.keySet())\n    "$header": "$util.escapeJavaScript($input.params().header.get($header))" #if($foreach.hasNext),#end\n\n    #end\n  },\n  "method": "$context.httpMethod",\n  "params": {\n    #foreach($param in $input.params().path.keySet())\n    "$param": "$util.escapeJavaScript($input.params().path.get($param))" #if($foreach.hasNext),#end\n\n    #end\n  },\n  "query": {\n    #foreach($queryParam in $input.params().querystring.keySet())\n    "$queryParam": "$util.escapeJavaScript($input.params().querystring.get($queryParam))" #if($foreach.hasNext),#end\n\n    #end\n  }  \n}'}
  
  for name, value in resources_dict.items():
    logger.runTrace('For resource ', name)
    resource_id = value[0]
    logger.runTrace('with id', resource_id)
    methods = value[1]
    for method in methods:
      logger.runTrace('on method', method)

      lambda_func = '${stageVariables.' + name + '_' + method.upper()+'}'
      logger.runTrace('stage varialbe is', lambda_func)
      #set integration with lambda function

      SetIntegrationType(client, api_id, resource_id, method, integration_type, lambda_func, requestTemplates)
  #TODO get methods 
  #TODO set Integration
  
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

def SetIntegrationType(client, api_id, resource_id, method, integration_type, lambda_func, requestTemplates):
  if method.upper() == 'OPTIONS': # for OPTIONS methods set to MOCK
    integration_type = 'MOCK'
    logger.runTrace('integration type', integration_type)

    response = client.put_integration(
      restApiId = api_id,
      resourceId = resource_id,
      httpMethod = method,
      type = integration_type,
      requestTemplates = {'application/json': '{"statusCode": 200}'}
    )
  else:
    uri = 'arn:aws:apigateway:us-west-2:lambda:path/2015-03-31/functions/arn:aws:lambda:us-west-2:061431082068:function:${}/invocations'
    uri = uri.replace('${}', lambda_func)
    response = client.put_integration(
      restApiId = api_id,
      resourceId = resource_id,
      httpMethod = method,
      type = integration_type,
      integrationHttpMethod = 'POST', # ! looks like integrationHttpMethod can only be POST for lambda
      uri = uri,
      requestTemplates = requestTemplates
    )
  print(json.dumps(response))

if __name__ == "__main__":
    main()