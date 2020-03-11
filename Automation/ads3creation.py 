#!/usr/bin/env python
import argparse
import boto3
import json
# import create_iam_role
import re

s3 = boto3.client('s3')


# description text
text = "Creates a s3 function with the provided name and role."

# initiate the parser
parser = argparse.ArgumentParser(description = text)
parser.add_argument("filename", help="s3 filename")

# read argument from the command line
args = parser.parse_args()

# name to assign to the s3 function
bucketname = args.filename

# requires Lamba name to follow the correct pattern
feature_exp = re.compile(r"feature-sprint[1-9]{1,}-s3-[a-zA-Z]{1,}$")
devProd_exp = re.compile(r"dev|prod-s3-[a-zA-Z]{1,}-[a-zA-Z]{1,}$")

if feature_exp.match(bucketname) or devProd_exp.match(bucketname):
	# calls the function to create the IAM role, returns the arn
	#iam_role = create_iam_role.get_role_arn(bucketname)

	try:
		response = s3.create_bucket(Bucket=bucketname, CreateBucketConfiguration={"LocationConstraint":"us-west-2"},)
# 		print(response)
		resp = (response.get('ResponseMetadata').get('HTTPHeaders').get('location'))
		print(resp)
	except Exception as error:
		print(error)
    
else:
    print("S3 bucket name does not follow the correct format.")