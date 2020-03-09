import boto3

client = boto3.client('apigateway')
api_id = input('Enter the API GATEWAY ID (press enter for default): ')
if api_id == '':
    api_id = 'ez9pmaodek'

authorizer_name = input('Enter the authorizer name (press enter for default): ')
if authorizer_name == '':
    authorizer_name = 'prod-api-authorizer-cognito'

cognito_user_pool_region = input('Enter cognito user pool region:')
cognito_user_pool_account_id = input('Enter cognito user account id:')
cognito_user_pool_id = input('Enter cognito user pool id:')

providerARN = 'arn:aws:cognito-idp:' + cognito_user_pool_region + ':' + cognito_user_pool_account_id + ':userpool/' + cognito_user_pool_id

response = client.create_authorizer(
    restApiId=api_id,
    name=authorizer_name,
    type='COGNITO_USER_POOLS',
    providerARNs=[providerARN,],
    identitySource='method.request.header.Authorization',
    authorizerResultTtlInSeconds=300
)