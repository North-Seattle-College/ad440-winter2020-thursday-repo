import boto3
import time

# This method will create an IAM role without permissions
def get_role_arn(name):
    iam_client = boto3.client('iam')
    
    # Adds "-role" to the Lambda function name
    name += "-" + "role"
    
    try:
        response = iam_client.create_role(
            Path='/service-role/',
            RoleName=name,
            # Uses Trust Policy in JSON string format
            AssumeRolePolicyDocument="{\n    \"Version\": \"2012-10-17\",\n    \"Statement\": [\n        {\n            \"Effect\": \"Allow\",\n            \"Principal\": {\n               \"Service\": \"lambda.amazonaws.com\"\n             },\n             \"Action\": \"sts:AssumeRole\"\n        }\n    ]\n}",
        #    Description='string',
        #    MaxSessionDuration=3600,
        #    PermissionsBoundary='string',
        #    Tags=[
        #        {
        #           'Key': 'string',
        #           'Value': 'string'
        #        },
        #    ]
        )

        print(response)

        # Force thread to sleep to allow role to propagate throughout the system
        time.sleep(15)
        # returns the IAM Role Arn 
        return response['Role']['Arn']
    
    except Exception as error:
        print(error)