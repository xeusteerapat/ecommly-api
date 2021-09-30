import { ProductAccess } from "./../data-layer/ProductAccess";
import { createLogger } from "./../utils/logger";
import { Images } from "../data-layer/ImageAccess";

const logger = createLogger("Product-Logic");
const image = new Images();
const product = new ProductAccess();

/**
 * @param signedUrl
 * @param productId
 * @param adminId
 */
export async function updateAttachmentUrl(
  signedUrl: string,
  productId: string
) {
  // Split url, then make use of the first part
  const attachmentUrl: string = signedUrl.split("?")[0];

  logger.info(`Signed URL ${{ attachmentUrl }}`);

  return await product.updateProductImageUrl(attachmentUrl, productId);
}

/**
 * @param productId
 */
export async function getImageSignedUrl(productId: string) {
  return image.getSignedUrl(productId);
}
