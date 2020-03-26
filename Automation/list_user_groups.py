#!/usr/bin/env python
import boto3

# create cognito client
client = boto3.client('cognito-idp')

# produces a response listing all the group data
response = client.list_groups(
    UserPoolId='us-west-2_xV6TGf7xl',
    Limit=60,
)

# Dictionary to hold all groups (keys) and their precedence (values)
group_dict = {}

try:
    # creates keys and assigns values
    for i in range(len(response[u'Groups'])):
        group_dict[response[u'Groups'][i][u'GroupName']] \
        = response[u'Groups'][i][u'Precedence']
        
except Exception as error:
    print(error)