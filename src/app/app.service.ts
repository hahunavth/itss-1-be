import { BadRequestException, Injectable } from '@nestjs/common';
import admin, { storageUrl } from './firebase';
import { v4 as uuid } from 'uuid';

@Injectable()
export class AppService {
  bucket = admin.storage().bucket();

  getHello(): string {
    return 'Hello World!';
  }

  async uploadFile(file: any) {
    if (!file) {
      throw new BadRequestException('Error: No files found');
    }

    const buffer = file.buffer;
    const token = uuid();

    const fileExt = file.originalname.split('.').pop();
    const filename = `${token}.${fileExt}`;
    // const filename = file.originalname;

    const metadata = {
      metadata: {
        firebaseStorageDownloadTokens: token,
      },
      contentType: file.mimetype,
      // contentType: 'image/png',
      cacheControl: 'public, max-age=31536000',
    };

    await this.bucket.file(`${filename}`).save(buffer, {
      metadata: metadata,
    });
    const finalUrl = `${storageUrl}/${filename}?alt=media&token=${token}`;
    return finalUrl;
  }
}
