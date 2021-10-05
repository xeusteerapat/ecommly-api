import {
  APIGatewayProxyEvent,
  APIGatewayProxyHandler,
  APIGatewayProxyResult,
} from "aws-lambda";
import "source-map-support/register";
import { getOrders } from "../../business-logic/order";
import { getUserProfile } from "../../utils/getUserProfile";
import { createLogger } from "../../utils/logger";

const logger = createLogger("Get-Product-By-Id");

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  logger.info("Processing event in GetProducts: ", event);

  try {
    const authorization = event.headers.Authorization;
    const jwtToken = authorization.split(" ")[1];
    const userProfile = await getUserProfile(jwtToken);

    const ordersByUserId = await getOrders(userProfile.userId);

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        items: ordersByUserId,
      }),
    };
  } catch (error) {
    return {
      statusCode: error.statusCode,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        message: error,
      }),
    };
  }
};
