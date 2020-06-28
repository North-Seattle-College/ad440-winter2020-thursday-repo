#!/usr/bin/env python

import boto3
import os
import io
import subprocess
from pynpm import NPMPackage
import zipfile


NODEJS_12X_RUNTIME = "nodejs12.x"
LAMBDA_HANDLER = 'index.handler'
LAMBDA_ROLE_ARN = "arn:aws:iam::061431082068:role/Lambda_Role"


# Returns the AWS Lambda client enabling the caller to use AWS Lambda resources
def lambda_client():
    # Pass in the AWS Resource you want to use.  Pass in your AWS Access key credentials, and region.
    aws_lambda = boto3.client('lambda', aws_access_key_id=os.getenv('AWS_ACCESS_KEY2_ID'),
        aws_secret_access_key=os.getenv('AWS_SECRET_ACCESS_KEY2'), region_name='us-west-2')
    return aws_lambda


# Prep and deploy a lambda function to your AWS account.
# The method takes in the function name, the path to the directory.
# The node.js runtime, the handler and the arn for the security role.
def deploy_lambda_function(function_name, dir_name, runtime, handler, role_arn):

    # To deploy our lambda, we must package it as a zip file.
    zip_file = make_zip_file_bytes(path=dir_name)

    # Try to Update the function.  This is the case if the function already exists.
    try:
        return lambda_client().update_function_code(
            FunctionName=function_name,
            ZipFile=zip_file,
        )
    # If it doesn't exist, create it.
    except:
        # Toddy said not to create new lambdas for Sprint 4
        return 0
        # return lambda_client().create_function(
        #     FunctionName=function_name,
        #     Runtime=runtime,
        #     Role=role_arn,
        #     Handler=handler,
        #     Code={
        #         'ZipFile': zip_file
        #     },
        #     Timeout=15,
        #     MemorySize=128,
        #     Publish=True,
        # )


# Convert a given file into a zipped file.
def make_zip_file_bytes(path):
    # In order for AWS to accept our zip files, we must first convert them to Byte objects.
    buf = io.BytesIO()
    with zipfile.ZipFile(buf, 'w') as z:
        for full_path, archive_name in files_to_zip(path=path):
            z.write(full_path, archive_name)
    return buf.getvalue()


# Create a zip file of all the files in a lambda directory.
def files_to_zip(path):
    for root, dirs, files in os.walk(path):
        for f in files:
            full_path = os.path.join(root, f)
            archive_name = full_path[len(path) + len(os.sep):]
            yield full_path, archive_name


# uses the pynpm module to run npm install in lambda directory
def run_npm_install(dir_name):
    pck = NPMPackage(dir_name + '/package.json')
    pck.install()


# Declare the function to return all file paths of the particular directory
def retrieve_file_paths(dirName):

    # setup file paths variable
    filePaths = []

    # Read all directories, subdirectories and file lists
    for root, directories, files in os.walk(dirName):
        for filename in files:
            # Create the full filepath by using os module.
            filePath = os.path.join(root, filename)
            filePaths.append(filePath)

    # return all paths
    return filePaths


# generate a list of all the directories with lambdas that need to be deployed.
def generate_lambda_list_to_deploy():
    lambda_list = []
    # Walk API directory finding all directories with Lambdas
    rootDir = './API/'
    for dirName, subdirList, fileList in os.walk(rootDir):
        # We know if it's a lambda directory because it has an index.js file in it.
        if 'index.js' in fileList:
            lambda_list.append(dirName)

    return lambda_list


# deploys all lambdas in the API directory.
def deploy_all_lambdas():
    # create list of directories with lambdas to deploy
    lambdas = generate_lambda_list_to_deploy()
    for dir_name in lambdas:
        # Generate the lambda name.
        lambda_name = get_lambda_name_from_directory(dir_name)
        # run npm install in lambda directory
        run_npm_install(dir_name)
        # deploy lambda
        deploy_lambda_function(lambda_name, dir_name, NODEJS_12X_RUNTIME, LAMBDA_HANDLER, LAMBDA_ROLE_ARN)
        print("Deployed " + lambda_name)


# Generate the name of the lambda function based off of the directory name.
def get_lambda_name_from_directory(dir_name):
    dir_name_components = dir_name.split('/')

    # remove dir_name_components until you get to API directory
    while dir_name_components[0] != "API":
        dir_name_components.pop(0)

    # remove API directory from dir_name_components
    dir_name_components.pop(0)
    # determine which environment we are deploying to based on branch
    branch = ""
    # Sprint 5, the development branch is our production environment.
    if os.getenv('TRAVIS_BRANCH') == 'development':
        branch = 'prod'
    # Sprint 5, the development branch is now our production environment. 
    # else:
    #     branch = 'dev'

    lambda_name = branch + "-" + dir_name_components[0]
    # iterate through dir_name_components to build lambda name
    for i in range(1, len(dir_name_components)):
        if dir_name_components[i] == 'id':
            lambda_name = lambda_name + "_" + dir_name_components[i]
        else:
            lambda_name = lambda_name + "-" + dir_name_components[i]
    lambda_name = lambda_name.lower()
    return lambda_name


# Start of the script.
if __name__ == '__main__':
    deploy_all_lambdas()
