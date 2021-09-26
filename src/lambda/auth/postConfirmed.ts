import * as AWS from "aws-sdk";
import {
  APIGatewayProxyEvent,
  APIGatewayProxyHandler,
  APIGatewayProxyResult,
} from "aws-lambda";
import "source-map-support/register";
import { createLogger } from "./../../utils/logger";
import * as AmazonCognitoIdentity from "amazon-cognito-identity-js";
import { ConfirmRequest } from "../../models/postConfirmRequest";

const logger = createLogger("Verification-User");

const poolData = {
  UserPoolId: process.env.USER_POOL_ID,
  ClientId: process.env.USER_POOL_CLIENT_ID,
};

AWS.config.update({
  region: process.env.REGION,
});

async function registerUser(body: ConfirmRequest) {
  const { email, verificationCode } = body;

  return new Promise(resolve => {
    const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

    const userData = {
      Username: email,
      Pool: userPool,
    };

    const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

    cognitoUser.getAttributeVerificationCode("email", {
      onSuccess: function (result) {
        resolve({
          statusCode: 200,
          result,
        });
      },
      onFailure: function (err) {
        logger.error("Error confirmmation account:", err);
        resolve({
          statusCode: 500,
          err,
        });
      },
      inputVerificationCode: function () {
        cognitoUser.verifyAttribute("email", verificationCode, this);
      },
    });
  });
}

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  logger.info("Verification-User: ", event);

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
