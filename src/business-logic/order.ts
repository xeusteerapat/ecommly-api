import { nanoid } from "nanoid";
import { OrderAccess } from "./../data-layer/OrderAccess";
import { CreateOrder, Order } from "./../models/Order";
import { createLogger } from "./../utils/logger";

const logger = createLogger("Order-Logic");
const order = new OrderAccess();

/**
 * Create new order
 * @param newOrder object from request body
 * @param userId from request headers
 */
export async function createOrder(
  newOrder: CreateOrder,
  userId: string
): Promise<Order> {
  logger.info(`Create new product`);

  const newOrderItem: Order = {
    userId,
    orderId: nanoid(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ...newOrder,
  };

  return await order.createOrder(newOrderItem);
}
