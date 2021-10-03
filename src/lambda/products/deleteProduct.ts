import {
  APIGatewayProxyEvent,
  APIGatewayProxyHandler,
  APIGatewayProxyResult,
} from "aws-lambda";
import "source-map-support/register";
import { deleteProductById } from "../../business-logic/product";
import { createLogger } from "./../../utils/logger";

const logger = createLogger("Delete-Product-By-Id");

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  logger.info("Processing event in Delete Products: ", event);

  try {
    const productId = event.pathParameters.productId;

    const deleteProductItem = await deleteProductById(productId);

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        items: deleteProductItem,
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
