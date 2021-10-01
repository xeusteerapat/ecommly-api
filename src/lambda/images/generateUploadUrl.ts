import "source-map-support/register";
import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  APIGatewayProxyHandler,
} from "aws-lambda";
import { createLogger } from "../../utils/logger";
import {
  getImageSignedUrl,
  updateAttachmentUrl,
} from "../../business-logic/product";

const logger = createLogger("Generate-Upload-Product-Url");

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  logger.info(`Processing upload url ${event}`);

  const productId = event.pathParameters.productId;

  if (!productId) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: "Missing productId parameter",
      }),
    };
  }

  //TODO: Need to check authorized admin before upload url

  const signedUrl: string = await getImageSignedUrl(productId);
  logger.info(`Retreived signe url image ${signedUrl}`);

  await updateAttachmentUrl(signedUrl, productId);

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      uploadUrl: signedUrl,
    }),
  };
};
