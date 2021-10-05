import * as AWS from "aws-sdk";
import * as AWSXRay from "aws-xray-sdk";
import { DocumentClient } from "aws-sdk/clients/dynamodb";
import { createLogger } from ".././utils/logger";
import { Order } from "../models/Order";

const logger = createLogger("Order-Access");

const XAWS = AWSXRay.captureAWS(AWS);

export class OrderAccess {
  constructor(
    private readonly docClient: DocumentClient = new XAWS.DynamoDB.DocumentClient(),
    private readonly orderTable = process.env.ORDERS_TABLE
  ) {}

  async createOrder(newOrderItem: Order) {
    await this.docClient
      .put({
        TableName: this.orderTable,
        Item: newOrderItem,
      })
      .promise();

    logger.info("Create new order item,", newOrderItem);

    return newOrderItem;
  }

  async getOrdersByUserId(userId: string) {
    const result = await this.docClient
      .query({
        TableName: this.orderTable,
        KeyConditionExpression: "userId = :userId",
        ExpressionAttributeValues: {
          ":userId": userId,
        },
      })
      .promise();

    return result.Items;
  }
}
