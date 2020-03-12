#!/usr/bin/env python
import boto3
import argparse
import set_user_attributes
import list_user_groups


# Method to add users to groups
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
group.add_argument("-u", "--user", help="create username entered")
parser.add_argument("-d", "--delete", help="delete username entered")

parser.add_argument("-a", "--add", help="add users to groups", action="store_true")


# read argument from the command line
args = parser.parse_args()

user_pool_id = 'us-west-2_xV6TGf7xl'
password=''

# create cognito client
client = boto3.client('cognito-idp')

if args.create or args.user:
    if args.create:
        # Bulk create all users
        user_dict = {'admin':'9VZd@fakemail.com',
                     'employee':'lUrq@fakemail.com',
                     'keyholder':'N2qb@fakemail.com'}
    else:
        # For individual user creation in lowercase
        one_user = args.user.lower()
        email = input("Enter email address: ")
        user_dict = {one_user:email}
    try:
        # Password will replace temp password set in next method
        password = input("Enter permanent password: ")
        
        # Creates new user, email address, and temp password
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
                ForceAliasCreation=False,
                DesiredDeliveryMediums=[
                    'EMAIL'
                ],
            )
            
            # Calls methods to verify email and replace temp password
            set_user_attributes.set_password(user_pool_id, username, password)
            set_user_attributes.verify_email(user_pool_id, username)
            
            # If add option selected, add users to groups
            if args.add:
                add_to_group(username)


    except Exception as error:
        print(error)

# Deletes user listed on the command line        
elif args.delete:    
    try: 
        response = client.admin_delete_user(
            UserPoolId=user_pool_id,
            Username=args.delete,
        )
    except Exception as error:
        print(error)
    