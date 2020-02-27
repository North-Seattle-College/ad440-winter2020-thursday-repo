import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
  UserPoolId: "us-west-2_vPs8xnAmS",
  ClientId: "2ctco44jlam5f8f06aegi1gnmt"
};

export default new CognitoUserPool(poolData);
