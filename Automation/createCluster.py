#!/usr/bin/env python

import boto3
import sys

rds = boto3.client('rds')

username = sys.argv[1]
password = sys.argv[2]
securityGroupId = sys.argv[3]
clusterIdentifier = sys.argv[4]

try:
  response = rds.create_db_cluster(
    DBClusterIdentifier=clusterIdentifier,
    MasterUsername=username,
    MasterUserPassword=password,
    VpcSecurityGroupIds=[
        securityGroupId,
    ],
    Engine="aurora",
    Port=3306
  )

  print(response)

except Exception as error:
  print(error)
