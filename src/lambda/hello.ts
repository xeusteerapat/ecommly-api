import "source-map-support/register";
import {
  APIGatewayProxyEvent,
  APIGatewayProxyHandler,
  APIGatewayProxyResult,
} from "aws-lambda";
import { createLogger } from "../utils/logger";

const logger = createLogger("Get-Products");

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  logger.info("event: ", event);

  logger.info("check env", process.env.TEST_SECRET);

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      message: `Hello, from Ecommly ${process.env.TEST_SECRET}`,
    }),
  };
};
