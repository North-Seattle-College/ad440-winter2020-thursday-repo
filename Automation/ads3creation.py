#!/usr/bin/env python
import boto3
s3 = boto3.client('s3')

webite_configuration = {
    "ErrorDocument":{"Key":"error.html"},
    "IndexDocument":{"Suffix": "index.html"},
}

#set config
s3.put_bucket_website(Bucket="firstbucket", WebsiteConfiguration=webite_configuration)