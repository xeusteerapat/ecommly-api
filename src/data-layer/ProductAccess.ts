import * as AWS from "aws-sdk";
import * as AWSXRay from "aws-xray-sdk";
import {
  DeleteItemOutput,
  DocumentClient,
  UpdateItemOutput,
} from "aws-sdk/clients/dynamodb";
import { createLogger } from ".././utils/logger";
import { Product, UpdateProduct } from "../models/Product";

const logger = createLogger("Products-Access");

const XAWS = AWSXRay.captureAWS(AWS);

export class ProductAccess {
  constructor(
    private readonly docClient: DocumentClient = new XAWS.DynamoDB.DocumentClient(),
    private readonly productTable = process.env.PRODUCTS_TABLE
  ) {}

  async getProducts(): Promise<Product[]> {
    const result = await this.docClient
      .scan({
        TableName: this.productTable,
      })
      .promise();

    logger.info("Get all products");

    const items = result.Items;

    return items as Product[];
  }

  async getProductById(productId: string) {
    const result = await this.docClient
      .query({
        TableName: this.productTable,
        KeyConditionExpression: "productId = :productId",
        ExpressionAttributeValues: {
          ":productId": productId,
        },
      })
      .promise();

    return result.Items[0];
  }

  async createProduct(newProduct: Product): Promise<Product> {
    await this.docClient
      .put({
        TableName: this.productTable,
        Item: newProduct,
      })
      .promise();

    logger.info("Create new product item,", newProduct);

    return newProduct;
  }

  async updateProduct(productId: string, updateValue: UpdateProduct) {
    const updatedProductItem: UpdateItemOutput = await this.docClient
      .update({
        TableName: this.productTable,
        Key: { productId },
        ReturnValues: "ALL_NEW",
        UpdateExpression: "set #name = :name, #price = :price",
        ExpressionAttributeValues: {
          ":name": updateValue.name,
          ":price": updateValue.price,
        },
        ExpressionAttributeNames: {
          "#name": "name",
          "#price": "price",
        },
      })
      .promise();

    const updatedProduct = updatedProductItem.Attributes;

    logger.info("Updated product,", updatedProduct);

    return updatedProduct;
  }

  async deleteProduct(productId: string) {
    const deleteProductItem: DeleteItemOutput = await this.docClient
      .delete({
        TableName: this.productTable,
        Key: {
          productId,
        },
        ReturnValues: "ALL_OLD",
      })
      .promise();

    const deletedProduct = deleteProductItem.Attributes;

    logger.info("Deleted product", deletedProduct);

    return deletedProduct;
  }

  async updateProductImageUrl(url: string, productId: string) {
    const updateProductItem: UpdateItemOutput = await this.docClient
      .update({
        TableName: this.productTable,
        Key: { productId },
        UpdateExpression: "set #imageUrl = :imageUrl",
        ExpressionAttributeValues: {
          ":imageUrl": url,
        },
        ExpressionAttributeNames: {
          "#imageUrl": "imageUrl",
        },
      })
      .promise();

    const updateProductWithUrl = updateProductItem.Attributes;

    logger.info("Product url updated", updateProductWithUrl);
  }
}
