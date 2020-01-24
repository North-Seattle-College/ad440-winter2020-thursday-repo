#!/usr/bin/env python

import boto3
import sys

rds = boto3.client('rds')

try:
  response = rds.create_db_instance(
    DBClusterIdentifier='auroraCluster',
    DBInstanceClass='db.t3.small',
    DBInstanceIdentifier="auroraDatabase",
    Engine="aurora",
  )

  print(response)

except Exception as error:
  print(error)
