import * as AmazonCognitoIdentity from "amazon-cognito-identity-js";
import {
  APIGatewayProxyEvent,
  APIGatewayProxyHandler,
  APIGatewayProxyResult,
} from "aws-lambda";
import "source-map-support/register";
import { SignInRequest } from "./../../models/signinRequest";
import { createLogger } from "./../../utils/logger";

const logger = createLogger("Signin-User");

const poolData = {
  UserPoolId: process.env.USER_POOL_ID,
  ClientId: process.env.USER_POOL_CLIENT_ID,
};

async function signinUser(body: SignInRequest) {
  const { email, password } = body;

  return new Promise(resolve => {
    const authenticationDetails =
      new AmazonCognitoIdentity.AuthenticationDetails({
        Username: email,
        Password: password,
      });

    const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

    const userData = {
      Username: email,
      Pool: userPool,
    };

    const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: function (result) {
        return resolve({
          statusCode: 200,
          token: result.getIdToken().getJwtToken(),
          userId: result.getIdToken().payload.sub,
          role: result.getIdToken().payload["cognito:groups"],
        });
      },
      onFailure: function (err) {
        

        return resolve({
          statusCode: 401,
          result: err,
        });
      },
    });
  });
}

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  logger.info("Signin user event: ", event);

  const body = JSON.parse(event.body);

  const result = await signinUser(body);

  return {
    statusCode: 201,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      result,
    }),
  };
};
