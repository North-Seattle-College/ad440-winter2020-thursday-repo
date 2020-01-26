#!/usr/bin/env python

import boto3
import sys
import re

rds = boto3.client('rds')

username = sys.argv[1]
password = sys.argv[2]
securityGroupId = sys.argv[3]
github_branch = sys.argv[4]
dbClusterIdentifier = ''



# regex objects for compliant branch names
development_exp = re.compile(r"development$")
feature_exp = re.compile(r"feature-sprint[1-6]-[a-zA-Z]{1,}$")

# check if branch name is correct format
# branch needs to either be development or feature-branchx-username
if development_exp.match(github_branch) or feature_exp.match(github_branch):

    # convert branch name into DBClusterIdentifier
    branch_components = github_branch.split('-')

    # determine if it's the development branch or a feature branch
    if len(branch_components) == 1:
        dbClusterIdentifier = "dev-db-cluster"
    else:
        dbClusterIdentifier = "feature-cluster-" + branch_components[1] + "-" + branch_components[2]

    #print(dbClusterIdentifier)
    try:
      response = rds.create_db_cluster(
        DBClusterIdentifier=dbClusterIdentifier,
        MasterUsername=username,
        MasterUserPassword=password,
        VpcSecurityGroupIds=[
            securityGroupId,
        ],
        DBSubnetGroupName='db-subnet-group',
        Engine="aurora",
        Port=3306,
        SourceRegion='us-west-2'
      )

      print(response)

    except Exception as error:
      print(error)

else: # if the github_branch does not follow the naming convention, then don't execute the script
    print("The branch name does not follow convention, No database will be created.")
