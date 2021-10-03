import { nanoid } from "nanoid";
import { OrderAccess } from "./../data-layer/OrderAccess";
import { CreateOrder, Order } from "./../models/Order";
import { createLogger } from "./../utils/logger";

const logger = createLogger("Order-Logic");
const order = new OrderAccess();

/**
 * Create new product
 * @param newProduct object from request body
 */
export async function createOrder(newOrder: CreateOrder): Promise<Order> {
  logger.info(`Create new product`);

  const newOrderItem: Order = {
    orderId: nanoid(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ...newOrder,
  };

  return await order.createOrder(newOrderItem);
}
