export interface Product {
  productId: string;
  name: string;
  price: number;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProduct {
  name: string;
  price: number;
  imageUrl?: string;
}

export interface UpdateProduct {
  name?: string;
  price?: number;
  imageUrl?: string;
}
