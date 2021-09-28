import * as AWS from "aws-sdk";
import {
  APIGatewayProxyEvent,
  APIGatewayProxyHandler,
  APIGatewayProxyResult,
} from "aws-lambda";
import "source-map-support/register";
import { createLogger } from "./../../utils/logger";
import * as AmazonCognitoIdentity from "amazon-cognito-identity-js";
import { SignUpRequest } from "../../models/signupRequest";

const logger = createLogger("Signup-User");

const poolData = {
  UserPoolId: process.env.USER_POOL_ID,
  ClientId: process.env.USER_POOL_CLIENT_ID,
};

AWS.config.update({
  region: process.env.REGION,
});

async function registerUser(body: SignUpRequest) {
  const { email, password } = body;

  return new Promise(resolve => {
    let attributesList = [];

    attributesList.push(
      new AmazonCognitoIdentity.CognitoUserAttribute({
        Name: "email",
        Value: email,
      })
    );

    const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

    userPool.signUp(email, password, attributesList, null, function (err) {
      if (err) {
        logger.error("Error Signup user:", err);

        return resolve({
          statusCode: 500,
          err,
        });
      }

      resolve({
        statusCode: 200,
        email,
        message: "User successfully registered",
      });
    });
  });
}

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  logger.info("Signup user event: ", event);

  const body = JSON.parse(event.body);

  const result = await registerUser(body);

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
