#!/usr/bin/env python
import boto3

# declare the clients to configure the domain and set the base path
domain_client = boto3.client('apigateway')
base_path=boto3.client('apigateway')

# method to configure custom domain
try:
    response = domain_client.create_domain_name(
        domainName='api.2edusite.com',
        regionalCertificateArn='arn:aws:acm:us-west-2:061431082068:certificate/a76789ce-ecbc-4984-b4e3-dd390480beac',
        
        # Shows the endpoint type of the domain name (Regional,Private, or Edge)
        endpointConfiguration={
            'types': [
                'REGIONAL',
            ]
        },
    #    tags={
    #        'string': 'string'
    #    },
        securityPolicy='TLS_1_2'
    )
    print(response)
    
except Exception as error:
    print(error)

# method to set the base path for the domain
try:
    response2 = base_path.create_base_path_mapping(
        domainName='api.2edusite.com',
        basePath='',
        restApiId='ez9pmaodek',
        stage=''
    )
    print(response2)
    
except Exception as error:
    print(error)
