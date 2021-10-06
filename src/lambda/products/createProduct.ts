import { CreateProduct } from "./../../models/Product";
import { createLogger } from "./../../utils/logger";
import "source-map-support/register";
import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  APIGatewayProxyHandler,
} from "aws-lambda";
import { createProduct } from "../../business-logic/product";

const logger = createLogger("Create-Products");

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  logger.info("Processing event in Create new product: ", event);

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

  const newProduct: CreateProduct = JSON.parse(event.body);

  const newProductItem = await createProduct(newProduct);

  return {
    statusCode: 201,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      item: newProductItem,
    }),
  };
};
