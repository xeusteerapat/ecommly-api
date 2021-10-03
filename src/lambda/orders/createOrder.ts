// import { CreateOrder } from "./../../models/Order";
import { createLogger } from "./../../utils/logger";
import "source-map-support/register";
import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  APIGatewayProxyHandler,
} from "aws-lambda";
// import { createOrder } from "../../business-logic/order";
import { getUserProfile } from "../../utils/getUserProfile";

const logger = createLogger("Create-Products");

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  logger.info("Processing event in Create new product: ", event);

  const authorization = event.headers.Authorization;
  const jwtToken = authorization.split(" ")[1];

  const userProfile = await getUserProfile(jwtToken);

  // const newProduct: CreateOrder = JSON.parse(event.body);

  // const newProductItem = await createOrder(newProduct);

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      item: userProfile,
    }),
  };
};
