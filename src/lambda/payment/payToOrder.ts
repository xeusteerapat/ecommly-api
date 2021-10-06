import {
  APIGatewayProxyEvent,
  APIGatewayProxyHandler,
  APIGatewayProxyResult,
} from "aws-lambda";
import "source-map-support/register";
import {
  createCharge,
  createCreditCardToken,
} from "../../business-logic/payment";
import { getUserProfile } from "../../utils/getUserProfile";
import { createLogger } from "./../../utils/logger";

const logger = createLogger("Create-Payment");

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  logger.info("Processing event in Create new payment: ", event);

  try {
    const authorization = event.headers.Authorization;
    const jwtToken = authorization.split(" ")[1];
    const userProfile = await getUserProfile(jwtToken);

    const orderId = event.pathParameters.orderId;
    const token = await createCreditCardToken();

    const newCharges = await createCharge(JSON.parse(event.body), token.id);

    const paymentResult = {
      orderId,
      userId: userProfile.userId,
      status: newCharges.status,
    };

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        result: paymentResult,
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
