#!/usr/bin/env python
import argparse
import boto3


# description text
text = "Creates a Lambda function with the provided name and role."

# initiate the parser
parser = argparse.ArgumentParser(description = text)
parser.add_argument("filename", help="lambda filename")
parser.add_argument("role", help="iam role arn")
# read argument from the command line
args = parser.parse_args()

function_name = args.filename
iam_role = args.role

# Required regular expression pattern for Role: 
# arn:(aws[a-zA-Z-]*)?:iam::\d{12}:role/?[a-zA-Z_0-9+=,.@\-_/]+

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
