import { createLogger } from "./../../utils/logger";
import "source-map-support/register";
import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  APIGatewayProxyHandler,
} from "aws-lambda";
import { getProductById } from "../../business-logic/product";

const logger = createLogger("Get-Product-By-Id");

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  logger.info("Processing event in GetProducts: ", event);

  try {
    const productId = event.pathParameters.productId;

    const productItem = await getProductById(productId);

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        items: productItem,
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
