#!/usr/bin/env python
import boto3
import argparse
import re
import list_user_groups


# Method to add users to groups
def check_group_name(grp_name, username):
    group_dict = list_user_groups.group_dict
    if grp_name in group_dict:
        response = client.admin_add_user_to_group(
            UserPoolId=user_pool_id,
            Username=username,
            GroupName=grp_name
        )
    else:
        print("'{}' doesn't match a valid Group Name.".format(grp_name))
        print("'{}' was not added to a group.".format(username))
        print("Valid Groups: ")
        print('{:15}'.format('Group'), '{:>10}'.format('Precedence'))
        for group in group_dict:
            print('{:15}'.format(group), '{:>10}'.format(group_dict[group])) 

# description text
text = "Creats or deletes users via cognito and adds roles to user via cognito"

# initiate the parser
parser = argparse.ArgumentParser(description = text)
group = parser.add_mutually_exclusive_group()
group.add_argument("-n", "--new", help="create username entered")
group.add_argument("-u", "--user", help="username for group update")
parser.add_argument("-g", "--group", help="group to add")
parser.add_argument("-r", "--remove", help="group to remove")
parser.add_argument("-e", "--email", help='user email for new user')
group.add_argument("-d", "--delete", help="delete username entered")

# read argument from the command line
args = parser.parse_args()

user_pool_id = 'us-west-2_xV6TGf7xl'
password=''

email_exp = re.compile(r"[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+")

# create cognito client
client = boto3.client('cognito-idp')
email = ''

if args.new:
    # For individual user creation in lowercase
    one_user = args.new.lower()
    if args.email and email_exp.match(args.email):
        email = args.email
    else:
        while not email_exp.match(email) and email != 'q':
            email = input("Please enter a valid email address or 'q' to quit: ")
            
    try:
        # Creates new user, email address, and temp password

        response = client.admin_create_user(
            UserPoolId=user_pool_id,
            Username=one_user,
            UserAttributes=[
                {
                    'Name': 'email',
                    'Value': email,
                },
            ],
            ForceAliasCreation=False,
            DesiredDeliveryMediums=[
                'EMAIL'
            ],
        )

        # If add option selected, add users to groups
        if args.group:
            group_name = args.group
            check_group_name(group_name, one_user)
            
    except Exception as error:
        print(error)

elif args.user:
    curr_user = args.user
    try:
        if args.group:
                group_name = args.group
                check_group_name(group_name, curr_user)           
        elif args.remove:     
            group_name = args.remove
            response = client.admin_remove_user_from_group(
                UserPoolId=user_pool_id,
                Username=curr_user,
                GroupName=group_name
            )      
        else:
            print("No action taken, add -g <groupname> or -r <groupname> at command line.")
            
    except Exception as error:
            print(error)
    
# Deletes user listed on the command line        
elif args.delete:
    del_user = args.delete
    print("Are you sure you want to delete user: ", del_user)
    ans = input("Enter 'y' to delete or any other key to save: ")
    try: 
        if ans.lower() == 'y' or ans.lower() == 'yes':
            response = client.admin_delete_user(
                UserPoolId=user_pool_id,
                Username=del_user,
            )
            s_code = response['ResponseMetadata']['HTTPStatusCode']
            if s_code == 200:
                print("User '{}' was deleted successfully.".format(del_user))
            else:
                print(response)
        else:
            print("User " + del_user + " was not deleted.")
    
    except Exception as error:
        print(error)

else:
    print("No action taken")