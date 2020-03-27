#!/usr/bin/env python
import os
import boto3
# import create_iam_role (will use Lamdba_Role for all lambdas)
import re

def main():
  # description text
  text = "Creates a Lambda function with the provided name and role."

  # list of all methods
  stg_var_name_lst = ['keybundle_GET',
                      'keybundle_id_DELETE',
                      'keybundle_id_GET',
                      'keybundle_id_PUT',
                      'keyholder_GET',
                      'keyholder_POST',
                      'keyholder_id_DELETE',
                      'keyholder_id_GET',
                      'keyholder_id_PUT',
                      'property_GET',
                      'property_POST',
                      'property_id_DELETE',
                      'property_id_GET',
                      'property_id_PUT',
                      'property_id_keybundle_GET',
                      'property_id_keybundle_POST'
                      ]
  
  enviromentalVariables = {
    'Variables': {
      'RDS_DATABASE': 'keymanagement',
      'RDS_HOSTNAME': '',
      'RDS_PASSWORD': '',
      'RDS_PORT': '3306',
      'RDS_USERNAME': 'anuslorah'
    }
  }

  # read argument from the command line
  print(text)
  stg = getStage()
  lambda_lst = getFunction(stg_var_name_lst)
  length = len(lambda_lst)
  for l in range(length):
    fun = lambda_lst[l]
    lambda_lst[l] = stg+fun

  print('Lambda Functions to be created', *lambda_lst)

  # iam_role to a pre-existing IAM role "Lambda_Role"
  iam_role = 'arn:aws:iam::061431082068:role/Lambda_Role'

  lambda_client = boto3.client('lambda')

  #Builds a lambda function using the code in function.zip
  for function_name in lambda_lst:
    try:
      response = lambda_client.create_function(
          Code = {
              'S3Bucket': 'keycheckout',
              'S3Key': 'function.zip',
              },  
          Description='',
          FunctionName=function_name,
          Handler='index.handler',
          MemorySize=128,
          Publish=True,
          Role=iam_role,
          Runtime='nodejs12.x',
          Timeout=15,
          VpcConfig={
          },
          Environment  = enviromentalVariables
      )
      print(response)
    
    except Exception as error:
        print(error)



def getStage():
  stg_get = input('Are you creating function(s) for feature stage(y/n): ')
  if stg_get.lower() in ['y', 'n', 'yes', 'no']:
    if stg_get.lower() in ['y', 'yes']: 
      sprint_num = input('input the sprint number: ')
      if sprint_num.isnumeric():
        stg_get = 'feature-sprint' + sprint_num + '-api-'
      else:
        print('sprint number must be numeric')
        os.abort()
    else:
      stg_get = input('Enter stage name: ')
      stg_get = stg_get.lower()
      if stg_get in ['prod', 'dev', 'production', 'development']:
        if stg_get in ['dev', 'development']:
          stg_get = 'dev-'
        else:
          stg_get = 'prod-'
      else:
        alt_stg_boo = input('You have entered a stage name outside regular stage nameing convention, do you want to proceed(y/n): ')
        if alt_stg_boo.lower() in ['y', 'yes']:
          alt_stg_confirm = input('Type the stage name again to confirm: ')
          if stg_get == alt_stg_confirm:
            stg_get = stg_get.lower() + '-'
          else:
            print ('You entries do not match, system abort.')
            os.abort()
        else:
          getStage()
  else:
    print ('Unrecognizable input, system abort.')
    os.abort()
  return(stg_get)

def getFunction(stg_var_name_lst):
  lambda_lst = []
  print ('List of lambda functions:')
  length = len(stg_var_name_lst)
  for l in range(length):
    print(str(l+1)+'.'+ stg_var_name_lst[l], end=" ")
  print('')
  lam_get = input('Enter method name/number, separate by comma, or type all for all: ')
  lam_get = lam_get.replace(" ", "")
  if lam_get.lower() == 'all':
    l = len(stg_var_name_lst)
    lam_get = []
    for i in range(l):
      lam_get.append(str(i+1))
  else:
    lam_get = lam_get.split(',')
  
  stg_var_name_lst_lower = []
  for n in stg_var_name_lst:
    stg_var_name_lst_lower.append(n.lower())

  for lam in lam_get:
    methodName = ''
    if lam.isnumeric() and int(lam)<=length+1:
      methodNum = int(lam) - 1
      methodName = stg_var_name_lst[methodNum]
    
    elif lam.lower() not in stg_var_name_lst_lower:
      alt_lam_bool = input('Method name you enter is not a known method, are you sure to proceed? (y/n): ')
      if alt_lam_bool.lower() in ['y', 'yes']:
        alt_lam_confirm = input('Please re-enter the method name to confirm: ')
        if lam != alt_lam_confirm:
          print('Mis-match inputs, system abort.')
          os.abort()
        else:
          methodName = lam
      else:
        getFunction(stg_var_name_lst)
    elif lam.lower() in stg_var_name_lst_lower:
      methodName = lam
    else:
      print('Cannot identify the method number/name')
      os.abort()

    lambdaName = methodName.lower().replace('_','-')
    lambdaName = lambdaName.replace('-id', '_id')
    lambda_lst.append(lambdaName)
  
  return lambda_lst

if __name__ == "__main__":
    main()
