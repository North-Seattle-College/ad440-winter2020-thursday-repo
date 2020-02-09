#!/usr/bin/env python
import boto3
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


try:
	response=s3.put_bucket_website(
		Bucket="bucket",
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

