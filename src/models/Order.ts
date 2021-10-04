export interface Order {
  orderId: string;
  userId: string;
  orderItems: OrderItems[];
  createdAt: string;
  updatedAt: string;
}

export interface OrderItems {
  productId: string;
  quantity: number;
}

export interface CreateOrder {
  productId: string;
  orderId: string;
  userId: string;
  quantity: number;
}

export interface UpdateOrder {
  productId?: string;
  orderId?: string;
  userId?: string;
  quantity?: number;
}
