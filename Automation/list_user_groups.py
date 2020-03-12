#!/usr/bin/env python
import boto3

# create cognito client
client = boto3.client('cognito-idp')

response = client.list_groups(
    UserPoolId='us-west-2_xV6TGf7xl',
    Limit=60,
)

group_dict = {}

for i in range(len(response[u'Groups'])):
    group_dict[response[u'Groups'][i][u'GroupName']] \
    = response[u'Groups'][i][u'Precedence']