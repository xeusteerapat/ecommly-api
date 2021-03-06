import { nanoid } from "nanoid";
import { OrderAccess } from "./../data-layer/OrderAccess";
import { Order, OrderItems } from "./../models/Order";
import { createLogger } from "./../utils/logger";

const logger = createLogger("Order-Logic");
const order = new OrderAccess();

/**
 * Create new order
 * @param newOrder object from request body
 * @param userId from request headers
 */
export async function createOrder(
  newOrder: OrderItems[],
  userId: string
): Promise<Order> {
  logger.info(`Create new product`);

  const totalPrice = newOrder.reduce((price: number, item: OrderItems) => {
    return price + item.price * item.quantity;
  }, 0);

  const newOrderItem: Order = {
    userId,
    orderId: nanoid(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    orderItems: newOrder,
    status: "pending",
    totalPrice: totalPrice,
  };

  return await order.createOrder(newOrderItem);
}

/**
 * Get order by userId
 * @param userId from request headers
 */
export async function getOrders(userId: string) {
  const orderByUserId = await order.getOrdersByUserId(userId);

  return orderByUserId;
}

/**
 * Create new order
 * @param userId from request headers
 */
export async function getOrderById(orderId: string, userId: string) {
  const orderItem = await order.getOrderById(orderId, userId);

  return orderItem;
}

/**
 *
 * @param orderId
 * @param userId
 * @param paymentStatus
 */
export async function updatePayment(
  orderId: string,
  userId: string,
  paymentStatus: string
) {
  await order.updatePaymentStatus(orderId, userId, paymentStatus);
}
