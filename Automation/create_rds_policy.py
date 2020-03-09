#!/usr/bin/env python
import json
import boto3

# This method will create an IAM rdn policy
def make_rds_policy():
    # Create IAM client
    iam = boto3.client('iam')

    try:
        # Create a policy
        my_managed_policy = {
            "Version": "2012-10-17",
            "Statement": [
                {
                    "Effect": "Allow",
                    "Action": [
                        "rds-db:connect"
                    ],
                    "Resource": [
                        "arn:aws:rds-db:us-west-2:061431082068:dbuser:*/lambda_func"
                    ]
                }
            ]
        }

        response = iam.create_policy(
          PolicyName='lambda-rds-policy',
          PolicyDocument=json.dumps(my_managed_policy)
        )
        print(response)

        return response['Policy']['Arn']

    except Exception as error:
        print(error)

