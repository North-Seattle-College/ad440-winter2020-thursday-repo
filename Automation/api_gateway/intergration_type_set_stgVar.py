import os
import boto3
import json
import apiGatewayLogger as logger

def main():
  #* set logger
  logger.setLogger('api_gateway_intergration_set_stage_variable.log')
  #* get client
  client = boto3.client('apigateway')
  #TODO get methods 
  #TODO set Integration
  
  
  
if __name__ == "__main__":
    main()