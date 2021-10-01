import { CreateProduct, Product } from "./../models/Product";
import { ProductAccess } from "./../data-layer/ProductAccess";
import { createLogger } from "./../utils/logger";
import { Images } from "../data-layer/ImageAccess";
import { nanoid } from "nanoid";

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
