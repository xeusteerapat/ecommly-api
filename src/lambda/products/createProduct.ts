import { createLogger } from "./../../utils/logger";
import "source-map-support/register";
import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  APIGatewayProxyHandler,
} from "aws-lambda";
// import { nanoid } from "nanoid";

const logger = createLogger("Get-Products");

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  logger.info("Processing event in GetProducts: ", event);

  const authorizedObject = event.requestContext.authorizer.claims;

  if (
    !authorizedObject["cognito:groups"].toLocaleLowerCase().includes("admin")
  ) {
    return {
      statusCode: 401,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        message: "You are not allowed to create product",
      }),
    };
  }

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      message: "Welcome Admin",
    }),
  };
};
