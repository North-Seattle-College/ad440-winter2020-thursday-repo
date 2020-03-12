#!/usr/bin/env python
import boto3


client = boto3.client('cognito-idp')

# Method to replace temp password    
def set_password(user_pool_id, username, password):
    response = client.admin_set_user_password(
        UserPoolId=user_pool_id,
        Username=username,
        Password=password,
        Permanent=True
    )

# Method to set Verify Email to True
def verify_email(user_pool_id, username):  
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