import boto3
import json

client = boto3.client('apigateway')
response = client.get_integration_response(
    restApiId='ez9pmaodek',
    resourceId='5l1pnn',
    httpMethod='PUT',
    statusCode='200'
)

# response = client.get_resources(
#     restApiId='ez9pmaodek'
# )

print (response)

response = client.get_integration(
    restApiId='ez9pmaodek',
    resourceId='5l1pnn',
    httpMethod='PUT'
)

print (response)