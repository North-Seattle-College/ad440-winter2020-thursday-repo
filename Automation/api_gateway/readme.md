# Build New Stage
- run stage_build_apiGateway.py

  This builds a new stage in the gateway, and populate all methods with stage variables of current naming convention
- make sure all needed lambda functions are created.

  create_lambda_function_v2.py can be used to create these functions
- run lambda_stage_variable_enable_apiGateway.py

  This adds invocation rights to gateway method request intergration lambda.
