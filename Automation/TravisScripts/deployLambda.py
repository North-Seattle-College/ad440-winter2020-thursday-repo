#!/usr/bin/env python

import boto3
import os
import io
import subprocess
from pynpm import NPMPackage
import zipfile

#from src.utils import Utils

NODEJS_12X_RUNTIME = "nodejs12.x"
LAMBDA_HANDLER = 'lambda_function.handler'
NODEJS_LAMBDA_NAME = "NodeJSLambdaFunction"
LAMBDA_ROLE_ARN = "arn:aws:iam::061431082068:role/Lambda_Role"

def lambda_client():
  aws_lambda = boto3.client('lambda', region_name='us-west-2')
  return aws_lambda

def deploy_lambda_function(function_name, runtime, handler, role_arn):

  # run npm install to get node_modules

  folder_path = "../../API/testDeleteMe"
  zip_file = make_zip_file_bytes(path=folder_path)
  #zipFile = "../../API/testDeleteMe/testDeleteMe.zip"

  # Deploy Lambda Function

  # Update the function if deploy doesn't work.
  # return lambda_client().update_function_code(
  #   FunctionName=function_name,
  #   ZipFile=zip_file,
  # )

  # Try to deploy, if it already exists, then update.
  # return lambda_client().create_function(
  #   FunctionName=function_name,
  #   Runtime=runtime,
  #   Role=role_arn,
  #   Handler=handler,
  #   Code={
  #     'ZipFile': zip_file
  #   },
  #   Timeout=15,
  #   MemorySize=128,
  #   Publish=True,
  # )

  # will need to add api gateway calls to further configure newly created and deployed lambda.

def make_zip_file_bytes(path):
    buf = io.BytesIO()
    with zipfile.ZipFile(buf, 'w') as z:
        for full_path, archive_name in files_to_zip(path=path):
            z.write(full_path, archive_name)
    return buf.getvalue()

def files_to_zip(path):
    for root, dirs, files in os.walk(path):
        for f in files:
            full_path = os.path.join(root, f)
            archive_name = full_path[len(path) + len(os.sep):]
            yield full_path, archive_name

# uses the pynpm module to run npm install in lambda directory
def run_npm_install():
    pck = NPMPackage('../../API/testDeleteMe/package.json')
    pck.install()

# Declare the function to return all file paths of the particular directory
def retrieve_file_paths(dirName):

  # setup file paths variable
  filePaths = []

  # Read all directory, subdirectories and file lists
  for root, directories, files in os.walk(dirName):
    for filename in files:
        # Create the full filepath by using os module.
        filePath = os.path.join(root, filename)
        filePaths.append(filePath)

  # return all paths
  return filePaths

# create a zip file of all files in directory
def zipDir():
# Assign the name of the directory to zip
  dir_name = '../../API/testDeleteMe'

  # Call the function to retrieve all files and folders of the assigned directory
  filePaths = retrieve_file_paths(dir_name)
  print(filePaths)
  # printing the list of all files to be zipped
  print('The following list of files will be zipped:')
  # for fileName in filePaths:
  #   print(fileName)

  # writing files to a zipfile
  zip_file = zipfile.ZipFile(dir_name+'/testDeleteMe.zip', 'w')
  with zip_file:
    # writing each file one by one
    for file in filePaths:
      zip_file.write(file)

  print(dir_name+'.zip file is created successfully!')
  return zip_file

def generate_lambda_list_to_deploy():
  print("generate lambda list to deploy")
  lambda_list = []
  # Walk API directory finding all directories with Lambdas
  rootDir = '../../API/'
  for dirName, subdirList, fileList in os.walk(rootDir):
    print('Found directory: %s' % dirName)
    #for fname in fileList:
     #print('\t%s' % fname)
    if 'index.js' in fileList:
      print('index.js!')
      lambda_list.append(dirName)

  return lambda_list

def deploy_all_lambdas():
  print("deploy all lambdas:")
  # create list of directories with lambdas to deploy
  lambdas = generate_lambda_list_to_deploy()
  for lam in lambdas:
      # Generate the lambda name.
      print("love")


if __name__ == '__main__':
  print(os.getenv('TRAVIS_BRANCH'))
  #deploy_all_lambdas()
  #run_npm_install()
  #zipDir()
  #print(deploy_lambda_function(NODEJS_LAMBDA_NAME, NODEJS_12X_RUNTIME, LAMBDA_HANDLER, LAMBDA_ROLE_ARN))
