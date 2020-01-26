#!/usr/bin/env python
import boto3
s3 = boto3.client('s3')

try:
	response=s3.put_bucket_website(
		Bucket="robel-firstbucket",
		WebsiteConfiguration={
			"ErrorDocument":{
				"Key":"error.html"
			},
			"IndexDocument":{
				"Suffix":"index.html"
			}
        }
        
	)
	print(response)
	
	
except Exception as error:
    print(error) 

