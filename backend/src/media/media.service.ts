import { Injectable } from '@nestjs/common';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { v4 as uuid } from 'uuid';

@Injectable()
export class MediaService {
  private s3Client: S3Client;
  private cloudFrontDomain: string;

  constructor() {
    this.s3Client = new S3Client({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
      },
    });

    const cloudFrontDomain = process.env.CLOUDFRONT_DOMAIN;
    if (!cloudFrontDomain) {
      throw new Error(
        'CLOUDFRONT_DOMAIN environment variable is not set. Please set it in your .env file.',
      );
    }
    this.cloudFrontDomain = cloudFrontDomain;
  }

  async uploadMedia(file: Express.Multer.File, userId: string) {
    const fileExtension = file.originalname.split('.').pop();
    const key = `media/${userId}/${uuid()}.${fileExtension}`;

    const response = await this.s3Client.send(
      new PutObjectCommand({
        Bucket: process.env.AWS_MEDIA_S3_BUCKET_NAME as string,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
      }),
    );

    return {
      storageType: 's3',
      s3: {
        bucket: process.env.AWS_MEDIA_S3_BUCKET_NAME as string,
        key,
        size: response?.Size,
        region: process.env.AWS_REGION as string,
        metadata: {
          uploadedAt: new Date().toISOString(),
          contentType: file.mimetype,
        },
        cloudFront: {
          url: this.getMediaUrl(key),
        },
      },
      fileName: file.originalname,
    };
  }

  getMediaUrl(key: string) {
    return `https://${this.cloudFrontDomain}/${key}`;
  }
}
