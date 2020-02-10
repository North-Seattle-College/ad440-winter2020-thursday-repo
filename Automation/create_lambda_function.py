#!/usr/bin/env python
import argparse
import boto3
import create_iam_role
import re


# description text
text = "Creates a Lambda function with the provided name and role."

# initiate the parser
parser = argparse.ArgumentParser(description = text)
parser.add_argument("filename", help="lambda filename")

# read argument from the command line
args = parser.parse_args()

# name to assign to the Lambda function
function_name = args.filename

# requires Lamba name to follow the correct pattern
feature_exp = re.compile(r"feature-sprint[1-6]-[a-z]{1,}$")
devProd_exp = re.compile(r"dev|prod-[a-z]{1,}-[a-z]{1,}$")


if feature_exp.match(function_name) or devProd_exp.match(function_name):

    # calls the function to create the IAM role, returns the arn
    iam_role = create_iam_role.get_role_arn(function_name)

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
