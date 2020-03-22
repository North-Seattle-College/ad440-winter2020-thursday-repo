#!/usr/bin/env python
import boto3
import argparse
import re
import list_user_groups


# Method to add or remove users to/from groups
def update_group_name(grp_name, username, add):
    grp_dict = list_user_groups.group_dict
    if grp_name in grp_dict:
        if add:
            response = client.admin_add_user_to_group(
                UserPoolId=user_pool_id,
                Username=username,
                GroupName=grp_name
            )
        else:
            response = client.admin_remove_user_from_group(
                UserPoolId=user_pool_id,
                Username=username,
                GroupName=group_name
            ) 
            
    else:
        print("'{}' doesn't match a valid Group Name.".format(grp_name))
        print("Group name entered must be an exact match.")
        print("'{}' was not added to or removed from a group.".format(username))
        list_groups_precedences(grp_dict)

# method to display the keys and values of a dictionary in two columns
def list_groups_precedences(grp_dict):
        print("\nValid Groups:\n")
        print('{:15}'.format('Group'), '{:>10}'.format('Precedence'))
        print('__________________________')
        for group in grp_dict:
            print('{:15}'.format(group), '{:>10}'.format(grp_dict[group])) 
            
# description text
text = "Creates or deletes users via Cognito and adds roles to user via Cognito"

# initiate the parser
parser = argparse.ArgumentParser(description = text)
group = parser.add_mutually_exclusive_group()
group2 = parser.add_mutually_exclusive_group()
group.add_argument("-n", "--new", help="create username entered")
group.add_argument("-u", "--user", help="username for group update")
group.add_argument("-d", "--delete", help="delete username entered")
group2.add_argument("-g", "--group", help="group to add")
group2.add_argument("-r", "--remove", help="group to remove")
parser.add_argument("-e", "--email", help='user email for new user')
parser.add_argument("-l", "--list", action="store_true", 
                    help="displays list of groups with precedences")
parser.add_argument("-p", "--pool", help='user-pool-id, keyzapp id used by default')

# read argument from the command line
args = parser.parse_args()

if args.pool:
    user_pool_id = args.pool
else:
    # assign user pool id for keyzapp user-pool-id.
    user_pool_id = 'us-west-2_xV6TGf7xl'

email_exp = re.compile(r"[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+")

# create Cognito client
client = boto3.client('cognito-idp')
email = ''

# code for creating a new user
if args.new:
    # All user names will be created in lower case
    one_user = args.new.lower()
    if args.email and email_exp.match(args.email):
        email = args.email
    else:
        while not email_exp.match(email) and email != 'q':
            email = input("Please enter a valid email address or 'q' to quit: ")
            
    try:
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

        # If add option selected, add user to group
        if args.group:
            group_name = args.group
            update_group_name(group_name, one_user, True)
            
    except Exception as error:
        print(error)

# Code to add or remove a users from a group        
elif args.user:
    curr_user = args.user.lower()
    try:
        if args.group:
                group_name = args.group
                update_group_name(group_name, curr_user, True)           
        elif args.remove:     
            group_name = args.remove
            update_group_name(group_name, curr_user, False)
        else:
            print("No action taken, add -g {groupname} or -r {groupname} at command line.")
            
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

# If no user created or group added or removed        
else:
    print("User Pool not updated")

# Prints a list of all groups and there corresponding precedences
if args.list:
    group_dict = list_user_groups.group_dict
    list_groups_precedences(group_dict)