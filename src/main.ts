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
  const doc = `
  ### Sprint 3:
  - [x] 03. Coffee shop get all: find address by kw (address, name)
  - [x] 03. Coffee shop get all: filter by crowded_status: number -> crowded_status: number[]
  - [x] 06. Table users: add col nationality
  - [x] 06. Find review by nationality black|white list, return nationality in each reviews
  - [x] 08. Api create coffee shop
  - [x] 11. Api edit coffee shop
  - [x] 16. Add filter by bookmark_type in api get all coffee shop
  - [x] Add login, profile routes in auth
  `;
  const config = new DocumentBuilder()
    .setTitle('Eko api')
    .setDescription(doc)
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config, {});
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      docExpansion: 'none',
    },
  });

  await app.listen(3000);
}
bootstrap();
