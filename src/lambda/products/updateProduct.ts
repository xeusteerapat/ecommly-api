import { createLogger } from "./../../utils/logger";
import "source-map-support/register";
import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  APIGatewayProxyHandler,
} from "aws-lambda";
import { updateProductById } from "../../business-logic/product";

const logger = createLogger("Update-Product-By-Id");

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  logger.info("Processing event in UpdateProducts: ", event);

  try {
    const productId = event.pathParameters.productId;
    const updateData = JSON.parse(event.body);

    const updatedProductItem = await updateProductById(productId, updateData);

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        items: updatedProductItem,
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
