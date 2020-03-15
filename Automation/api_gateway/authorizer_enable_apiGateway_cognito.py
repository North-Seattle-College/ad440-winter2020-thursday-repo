import boto3
import json
import apiGatewayLogger as logger

def main():
  #* load boto client
  client = boto3.client('apigateway')

  #* set logger
  logger.setLogger('authorizer_enable_apiGateway_cognito.log')

  #* get api key with default to prod
  api_id = GetAPIId()
  #* get a dict of resources for the API {resource_name:resource_id,[methods]}
  resources_dict = GetResources(client, api_id)
  #* get authorizer
  authorizer = GetAuthorizer()

  #* Create Authorizer
  authorizer = CreateAuthorizer(client, api_id, authorizer)

  #* configure authorizer 
  ConfigureAuthorizer(client, api_id, authorizer, resources_dict)


def GetAPIId():
  api_id = input('Enter API Gateway ID (press enter for default): ')
  if api_id == '':
    api_id = 'ez9pmaodek'
  logger.inputTrace('API ID', api_id)
  return api_id

def GetAuthorizer():
  authorizer = {'type':'COGNITO_USER_POOLS'}
  authorizer_name = input('Enter the authorizer name (press enter for default): ')
  if authorizer_name == '':
      authorizer_name = 'prod-api-authorizer'
  logger.inputTrace('Authorizer Name', authorizer_name)
  authorizer['name'] = authorizer_name

  providerARNs = GetUserPools()
  authorizer['providerARNs'] = providerARNs

  identitySource = input('Enter the authorizer identity source (request header): ')
  if identitySource == '':
    identitySource = 'Authorization'
  identitySource = 'method.request.header.' + identitySource
  logger.inputTrace('Authorizer Identity Source', identitySource)
  authorizer['identitySource'] = identitySource

  authorizer_ttl = input('Enter the authorizer time to live (in seconds): ')
  if authorizer_ttl == '':
    authorizer_ttl = '300'
  try:
    authorizer_ttl = int(authorizer_ttl)
  except:
    authorizer_ttl = 300
    print('Time to live must be numerical, it has been set to default 300s!')
  logger.inputTrace('Authorizer Time To Live', authorizer_ttl)
  authorizer['TTL'] = authorizer_ttl

  return authorizer  

def GetUserPools():
  client = boto3.client('cognito-idp')
  userPool_lst = client.list_user_pools(
    MaxResults=999
  )
  userPool_lst = userPool_lst['UserPools']
  logger.generatedDebug('Cognito User Pools', json.dumps(userPool_lst))
  print('List of all Cognito User Pools:')
  length = len(userPool_lst)
  for userPool in userPool_lst:
    print (str(length + 1)+'. '+userPool['Name'], end=' ')
  print(' ')
  selected_pools = input('Select user pools to be used by its number, seperated by comma (default is 1): ')
  if selected_pools == '':
    selected_pools = [0]
  else:
    try:
      selected_pools = list(map(int, selected_pools))
    except:
      selected_pools = [0]
      print ('Your selection must be numerical saperated by comma, revert to default user group!')
  logger.inputTrace('User Pools selected:', **selected_pools)
  if any([num > length+1 for num in selected_pools]):
    print('Your selection is out of range!')
    GetUserPools()
  pools_lst = []
  for p in selected_pools:
    id = userPool_lst[p-1]['Id']
    arn = 'arn:aws:cognito-idp:us-west-2:061431082068:userpool/' + id
    pools_lst.append(arn)
  logger.generatedDebug('User Pools ARNs', pools_lst)
  return pools_lst

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

def CreateAuthorizer(client, api_id, authorizer):
  response = client.create_authorizer(
    restApiId = api_id,
    name = authorizer['name'],
    type = authorizer['type'],
    providerARNs = authorizer['providerARNs'],
    identitySource = authorizer['identitySource'],
    authorizerResultTtlInSeconds = authorizer['TTL']
  )
  logger.createInfo('Authorizer', json.dumps(response))
  authorizer['id'] = response['id']
  return authorizer

def ConfigureAuthorizer(client, api_id, authorizer, resources_dict):
  for resource in resources_dict:
    resource_id = resources_dict[resource][0]
    methods = resources_dict[resource][1]

    for method in methods:
      response = client.put_method(
        restApiId = api_id,
        resourceId = resource_id,
        httpMethod = method,
        authorizationType = authorizer['type'],
        authorizerId = authorizer['id']
      )
      logger.runTrace('Authorizer is configured on', method)

if __name__ == "__main__":
    main()