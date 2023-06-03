import { ValidationPipe, VersioningType } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';

import { AppModule } from '@app/app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { PrismaService } from '@src/common/prisma/prisma.service';
import { HttpExceptionFilter } from '@src/common/filters/http-exception.filter';
import { PrismaExceptionFilter } from '@src/common/filters/prisma-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  app.setGlobalPrefix('api');

  app.enableCors();

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '2',
  });

  app.useGlobalPipes(
    new ValidationPipe({
      enableDebugMessages: true,
      whitelist: true, // removes any property of query, body, and a parameter that is not part of our DTO
      transform: true, // enables the transformation of our incoming request
      transformOptions: {
        enableImplicitConversion: true,
      },
      always: true, // always transform incoming request
    }),
  );

  // exception filters
  // const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalFilters(new PrismaExceptionFilter());

  // swagger config
  // see https://docs.nestjs.com/openapi/introduction
  const config = new DocumentBuilder()
    .setTitle('Eko api')
    .setDescription('')
    .setVersion('1.0')
    // .addTag('eko')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
