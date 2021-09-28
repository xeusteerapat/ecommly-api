import * as AWS from "aws-sdk";
import {
  APIGatewayProxyEvent,
  APIGatewayProxyHandler,
  APIGatewayProxyResult,
  Context,
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

const cognitoISP = new AWS.CognitoIdentityServiceProvider({
  apiVersion: "2016-04-18",
});

async function registerUser(body: ConfirmRequest, context: Context) {
  const { email, verificationCode } = body;

  return new Promise(resolve => {
    const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

    const userData = {
      Username: email,
      Pool: userPool,
    };

    const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

    cognitoUser.confirmRegistration(
      verificationCode,
      true,
      async (err, result) => {
        if (err) {
          logger.error("Error verification account: ", err);

          return resolve({ statusCode: 422, response: err });
        }

        context.callbackWaitsForEmptyEventLoop = true;

        const params = {
          GroupName: process.env.CUSTOMER_GROUP,
          UserPoolId: process.env.USER_POOL_ID,
          Username: email,
        };

        // cognitoISP.adminAddUserToGroup(params, (err, resultAddUser) => {
        //   if (err) {
        //     logger.error("Error add user to group:", err);
        //   }

        //   logger.info("Success add new user to group", resultAddUser);
        // });
        await cognitoISP.adminAddUserToGroup(params).promise();

        return resolve({ statusCode: 200, response: result });
      }
    );
  });
}

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  logger.info("Verification-User: ", event);

  const body = JSON.parse(event.body);

  const result = await registerUser(body, context);

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
