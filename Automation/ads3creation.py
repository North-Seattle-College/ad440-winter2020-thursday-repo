#!/usr/bin/env python
import boto3
s3 = boto3.client('s3')

try:
    response = s3.create_bucket(
        Bucket="robel-firstbucket",
        CreateBucketConfiguration={
        	"LocationConstraint":"us-west-2"
        	},
    )
    print(response)
except Exception as error:
    print(error)