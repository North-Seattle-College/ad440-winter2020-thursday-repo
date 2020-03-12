#!/usr/bin/env python
import boto3

#aws cognito-idp admin-set-user-password --user-pool-id 'us-west-2_xV6TGf7xl' --username 'kyleo' --password 'H12!artS' --permanent
#
#aws cognito-idp admin-update-user-attributes --user-pool-id 'us-west-2_xV6TGf7xl' --username 'kyleo' --user-attributes Name=email_verified,Value=true

#user_pool_id = 'us-west-2_xV6TGf7xl'
#username = 'employee'
#password='AD440@testaccount'

client = boto3.client('cognito-idp')
    
def set_password(user_pool_id, username, password):
    response = client.admin_set_user_password(
        UserPoolId=user_pool_id,
        Username=username,
        Password=password,
        Permanent=True
    )

def verify_email(user_pool_id, username):  
    print('User Name2: ' + username)
    response = client.admin_update_user_attributes(
        UserPoolId=user_pool_id,
        Username=username,
        UserAttributes=[
            {
                'Name': 'email_verified',
                'Value': 'true'
            },
        ],
    )