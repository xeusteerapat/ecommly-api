import { nanoid } from "nanoid";
import { Images } from "../data-layer/ImageAccess";
import { ProductAccess } from "./../data-layer/ProductAccess";
import { CreateProduct, Product, UpdateProduct } from "./../models/Product";
import { createLogger } from "./../utils/logger";

const logger = createLogger("Product-Logic");
const image = new Images();
const product = new ProductAccess();

/**
 * Create new product
 * @param newProduct object from request body
 */
export async function createProduct(
  newProduct: CreateProduct
): Promise<Product> {
  logger.info(`Create new product`);

  const newProductItem: Product = {
    productId: nanoid(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ...newProduct,
  };

  return await product.createProduct(newProductItem);
}

/**
 *
 * Get all products
 * @returns
 */
export async function getProducts(): Promise<Product[]> {
  logger.info("Get all Product");

  const products = product.getProducts();

  return products;
}

/**
 *
 * Get product by productId
 * @param productId
 * @returns
 */
export async function getProductById(productId: string) {
  logger.info("Get product by id");

  const productItem = product.getProductById(productId);

  return productItem;
}

/**
 *
 * Update product by productId
 * @param productId
 * @returns
 */
export async function updateProductById(
  productId: string,
  updateData: UpdateProduct
) {
  logger.info("Update product by id");

  const productItem = product.updateProduct(productId, updateData);

  return productItem;
}

/**
 *
 * Delete product by productId
 * @param productId
 * @returns
 */
export async function deleteProductById(productId: string) {
  logger.info("Delete product by id");

  const deletedProductItem = product.deleteProduct(productId);

  return deletedProductItem;
}

/**
 * @param signedUrl
 * @param productId
 */
export async function updateAttachmentUrl(
  signedUrl: string,
  productId: string
) {
  // Split url, then make use of the first part
  const attachmentUrl: string = signedUrl.split("?")[0];

  logger.info("Signed URL", attachmentUrl);

  return await product.updateProductImageUrl(attachmentUrl, productId);
}

/**
 * @param productId
 */
export async function getImageSignedUrl(productId: string) {
  return image.getSignedUrl(productId);
}
