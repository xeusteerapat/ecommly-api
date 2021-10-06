import {
  APIGatewayProxyEvent,
  APIGatewayProxyHandler,
  APIGatewayProxyResult,
} from "aws-lambda";
import "source-map-support/register";
import { createOrder } from "../../business-logic/order";
import { getUserProfile } from "../../utils/getUserProfile";
import { OrderItems } from "./../../models/Order";
import { createLogger } from "./../../utils/logger";

const logger = createLogger("Create-Products");

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  logger.info("Processing event in Create new product: ", event);

  try {
    const authorization = event.headers.Authorization;
    const jwtToken = authorization.split(" ")[1];
    const userProfile = await getUserProfile(jwtToken);

    const newOrder: OrderItems[] = JSON.parse(event.body);
    const newOrderItem = await createOrder(newOrder, userProfile.userId);

    return {
      statusCode: 201,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        item: newOrderItem,
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
