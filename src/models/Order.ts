export interface Order {
  productId: string;
  orderId: string;
  userId: string;
  quantity: number;
  createdAt: string;
  updatedAt: string;
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
