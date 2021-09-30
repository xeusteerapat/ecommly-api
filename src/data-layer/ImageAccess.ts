import * as AWS from 'aws-sdk';
import * as AWSXray from 'aws-xray-sdk';
import { createLogger } from '../utils/logger';

const logger = createLogger('Image-Access');

const XAWS = AWSXray.captureAWS(AWS);
const s3 = new XAWS.S3({
  signatureVersion: 'v4',
});

export class Images {
  constructor(
    private readonly imagesBucketName = process.env.IMAGES_BUCKET_NAME,
    private readonly signedUrlExpiration = process.env.SIGNED_URL_EXPIRATION
  ) {}

  async getSignedUrl(productId: string): Promise<string> {
    const signedUrl = s3.getSignedUrl('putObject', {
      Bucket: this.imagesBucketName,
      Key: productId,
      Expires: Number(this.signedUrlExpiration),
    });

    logger.info(`Get signed url image ${{ signedUrl, productId }}`);

    return signedUrl;
  }
}
