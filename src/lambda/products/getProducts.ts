import { createLogger } from './../../utils/logger';
import 'source-map-support/register';
import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  APIGatewayProxyHandler,
} from 'aws-lambda';
import { nanoid } from 'nanoid';

const logger = createLogger('Get-Products');

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  logger.info('Processing event in GetProducts: ', event);

  const products = [
    {
      id: nanoid(),
      name: 'Shoes',
      SKU: 'shoes-001',
      price: 199,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
    {
      id: nanoid(),
      name: 'Dish',
      SKU: 'dish-001',
      price: 9,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
    {
      id: nanoid(),
      name: 'Shirt',
      SKU: 'shirt-001',
      price: 19.99,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
    {
      id: nanoid(),
      name: 'Laptop',
      SKU: 'laptop-001',
      price: 499,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
  ];

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify({
      items: products,
    }),
  };
};
