#!/usr/bin/env python
import boto3
import argparse
import create_rds_policy

# description text
text = "Attaches policy to role and optionally creates policy to attach"

# initiate the parser
parser = argparse.ArgumentParser(description = text)
parser.add_argument("-a", "--arn", help="IAM Policy ARN")

# read argument from the command line
args = parser.parse_args()

if args.arn:
    iam_policy_arn = args.arn
    
else:
    iam_policy_arn = create_rds_policy.make_rds_policy()

# Create IAM client
iam = boto3.client('iam')
role = 'Lambda_Role'

try:
    # Attach a role policy
    iam.attach_role_policy(
        PolicyArn=iam_policy_arn,
        RoleName=role
    )
    
except Exception as error:
    print(error)