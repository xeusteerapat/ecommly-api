export interface Order {
  orderId: string;
  userId: string;
  orderItems: OrderItems[];
  createdAt: string;
  updatedAt: string;
  status: string;
  totalPrice: number;
}

export interface OrderItems {
  productId: string;
  quantity: number;
  name: string;
  price: number;
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
