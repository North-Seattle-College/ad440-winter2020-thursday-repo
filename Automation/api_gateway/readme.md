# Build New Stage
- run stage_build_apiGateway.py

  This builds a new stage in the gateway, and populate all methods with stage variables of current naming convention
- make sure all needed lambda functions are created.

  create_lambda_function_v2.py can be used to create these functions.
- run lambda_stage_variable_enable_apiGateway.py

  This adds invocation rights to gateway method request integration lambda.

Deploy to stage in aws console. You may also want to check stage settings like throttle, CloudWatch log settings. Cache enable in the script is not tested, and may need further work.

# Rebuild API
- import swagger form [apiteam swagger](https://app.swaggerhub.com/apis/UnTamedLaw/keymanagement/4.0?loggedInWithGitHub=true)

- don't run intergration_type_set_stgVar.py (yes misspelled)

  This will set all methods to lambda integration (not lambda proxy integration) and update the integration request mapping. But for some reason it will delete all response status codes for all methods. Only run if it is fixed, and/or you need to add stage variables in bulk for new methods. (Then use export swagger to get around the issue.)

- run lambda_stage_variable_enable_apiGateway.py for all existing stages.

  This will add invocation rights of all lambda functions that are associated with the stages to the gateway lambdas. All lambdas should exist before this script has been ran.

- run cors_enable_apiGateway.py
  
  This will put CORS headers to all status codes of each method for all methods. It will also add 200 status code for methods without that default code, and add response mapping to 200 code. (This is done to get around api team's inability to put the keyword in the response header for some reason.)

- check in the gateway, things to look for:
   * integration lambda looks in right format
   * integration request mapping is there.
   * methods and integration response has status codes
   * 200 code exist for each method
   * response mapping is under 200 code

Deploy all stages in the aws console.

# Apply Cognito Integration to gateway
- run authorizer_enable_apiGateway_cognito.py

  This will allow you to add authorizer and associate authorizer to all methods exist in the gateway.

# Utilities
- temp.py allows you to get single method request and response (it is set to keybunld/{keybunld_id} PUT code 200) on the fly. This is useful to see various information for what they actually means if the boto3 documentation is lacking in details. It is also used to pull mapping, if you made and tested some mapping thingy free hand in console. 
- apiGatewayLogger.py is used to construct log file for the scripts. It is required for most scripts in the folder, so do not delete it.

# Hints and Wishes
- An consolidated script to build/rebuild api and its stage, would be nice. The current files are not written as easy modules, due to inconsistent workflow planning. few of the scripts maybe easier to rebuild than modify (If it is poorly commented then it is probably one), but I simplly ran out of time for them. :(

- boto3 documentation is very poor (and I cannot figure out how to use the apiGateway v2 scripts hence no auto deployment), sometimes it helps to look at the get response of what you are working on, and/or the CLI documentation which may have some additional and critical info..

- Good luck future devops, if there are any. Know your enemy, and stay on top of things.