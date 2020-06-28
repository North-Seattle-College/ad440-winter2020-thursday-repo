#!/usr/bin/env python
import argparse
import boto3
import re


# description text
text = "Bulk creates all lambda functions for the feature, dev, or prod env."

# initiate the parser
parser = argparse.ArgumentParser(description = text)
parser.add_argument("environment", help="enter 'dev', 'prod' or '#' of sprint")

# read argument from the command line
args = parser.parse_args()

# name to assign to the Lambda function
env_name = args.environment

# requires Lamba name to follow the correct pattern
sprint_exp = re.compile(r"[0-9]$")


# list of resources and methods
resource_method_lst = ['keybundle-get',
                    'keybundle_id-get',
                    'keybundle_id-put',
                    'keyholder-get',
                    'keyholder-post',
                    'keyholder-delete',
                    'keyholder_id-delete', 
                    'keyholder_id-get',
                    'keyholder_id-put',
                    'property-put',
                    'property-get',
                    'property-post',
                    'property-delete',
                    'property_id-delete',
                    'property_id-get',
                    'property_id-put',
                    'property_id-keybundle-get',
                    'property_id-keybundle-post']

if env_name == 'dev' or env_name == 'prod' or sprint_exp.match(env_name):
    
    # iam_role to a pre-existing IAM role "Lambda_Role
    iam_role = 'arn:aws:iam::061431082068:role/Lambda_Role'
    
    # If only integer is entered create feature-sprint#-api prefix
    if sprint_exp.match(env_name):
        env_name = "feature-sprint" + env_name + "-api"
     
    # bulk build complete list of lambda functions
    for method in resource_method_lst:
        function_name = env_name + "-" + method

        #Builds a lambda function using the code in function.zip
        try:
            lambda_client = boto3.client('lambda')
            response = lambda_client.create_function(
                Code = {
                    'S3Bucket': 'keycheckout',
                    'S3Key': 'function.zip',
                    },  
                Description='',
                FunctionName=function_name,
                Handler='index.handler',
                MemorySize=128,
                Publish=True,
                Role=iam_role,
                Runtime='nodejs12.x',
                Timeout=15,
                VpcConfig={
                },
            )

            print(response)

        except Exception as error:
            print(error)
    
else:
    print("Lambda name does not follow the correct format.")
