import {
  Controller,
  FileTypeValidator,
  Get,
  HttpStatus,
  MaxFileSizeValidator,
  ParseFilePipe,
  ParseFilePipeBuilder,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import 'multer';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        // comment: { type: 'string' },
        // outletId: { type: 'integer' },
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  async uploadFile(
    @UploadedFile(
      new ParseFilePipeBuilder()
        // FIXME: This is not working with multiple types
        // .addFileTypeValidator({ fileType: 'png' })
        .addMaxSizeValidator({ maxSize: 50000000 })
        .build({ errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY }),
    )
    file: Express.Multer.File,
  ) {
    // console.log(file);
    return {
      originalname: file.originalname,
      // encoding: file.encoding,
      mimetype: file.mimetype,
      url: await this.appService.uploadFile(file),
    };
  }
}
// https://firebasestorage.googleapis.com/v0/b/itss-1-be.appspot.com/o/Screenshot from 2023-06-16 14-53-32.png?alt=media&token=35c8c286-2b92-4297-bad7-69b759e49635"
// https://firebasestorage.googleapis.com/v0/b/itss-1-be.appspot.com/o/Screenshot from 2023-06-16 14-53-32.png?alt=media&token=2501d90c-ea91-47a5-8ee1-0acf16c695ec"
