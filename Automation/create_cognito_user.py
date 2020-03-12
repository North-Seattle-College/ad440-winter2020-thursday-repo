#!/usr/bin/env python
import boto3
import argparse
import set_user_attributes
import list_user_groups


def add_to_group(username):
    group_dict = list_user_groups.group_dict
    for group in group_dict:

        if ('admin' in username) or \
            ('emp' in username and 'Emp' in group) or \
            ('key' in username and 'Key' in group):
            response = client.admin_add_user_to_group(
                UserPoolId=user_pool_id,
                Username=username,
                GroupName=group
            )

# description text
text = "Creats or deletes users via cognito and adds roles to user via cognito"

# initiate the parser
parser = argparse.ArgumentParser(description = text)
group = parser.add_mutually_exclusive_group()
group.add_argument("-c", "--create", help="create admin, employee & keyholder",
                    action="store_true")
group.add_argument("-u", "--user", help="add username entered")
parser.add_argument("-d", "--delete", help="delete username entered")

parser.add_argument("-a", "--add", help="add roles", action="store_true")


# read argument from the command line
args = parser.parse_args()

user_pool_id = 'us-west-2_xV6TGf7xl'
password='AD440@testaccount'

# create cognito client
client = boto3.client('cognito-idp')

if args.create or args.user:
    if args.create:
        user_dict = {'admin2':'9VZd@fakemail.com',
                     'employee2':'2@fakemail.com',
                     'keyholder2':'3@fakemail.com'}
    else:
        email = input("Enter email address: ")
        user_dict = {args.user:email}
    try:
        for username in user_dict:
            response = client.admin_create_user(
                UserPoolId=user_pool_id,
                Username=username,
                UserAttributes=[
                    {
                        'Name': 'email',
                        'Value': user_dict[username],
                    },
                ],
#                TemporaryPassword='string',
                ForceAliasCreation=False,
#                MessageAction='RESEND',
                DesiredDeliveryMediums=[
                    'EMAIL'
                ],
            )
            set_user_attributes.set_password(user_pool_id, username, password)
            set_user_attributes.verify_email(user_pool_id, username)
            if args.add:
                add_to_group(username)


    except Exception as error:
        print(error)
        
elif args.delete:    
    try: 
        response = client.admin_delete_user(
            UserPoolId=user_pool_id,
            Username=args.delete,
        )
    except Exception as error:
        print(error)
    