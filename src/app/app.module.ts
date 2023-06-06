import { Module, ValidationPipe } from '@nestjs/common';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import { AppController } from '@app/app.controller';
import { AppService } from '@app/app.service';
import { PrismaModule } from '@src/common/prisma/prisma.module';
import { PrismaService } from '@src/common/prisma/prisma.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  APP_FILTER,
  APP_INTERCEPTOR,
  APP_PIPE,
  RouterModule,
} from '@nestjs/core';
import { ServeStaticModule } from '@nestjs/serve-static';
import {
  CommonModule,
  HttpExceptionFilter,
  PrismaExceptionFilter,
} from '@src/common';
import { configuration } from '@src/configs';
import { CoffeeShopController, CoffeeShopModule } from '@src/coffee_shops';
import { PrismaCrudModule } from 'nestjs-prisma-crud';
import { CoffeeShopV2Module } from '@src/coffee-shop-v2/coffee-shop-v2.module';
import { UserModule } from '@src/users/user.module';
import { DevicesModule } from '@src/devices';
import { ReviewsModule } from '@src/reviews/reviews.module';
import { CategoriesModule } from '@src/categories/categories.module';

@Module({
  imports: [
    PrismaModule,
    /**
     *  PrismaCrudModule registers the PrismaService provider globally.
     */
    PrismaCrudModule.register({
      prismaService: PrismaService,
    }),
    /**
     * Api service modules
     */
    CoffeeShopModule,
    CoffeeShopV2Module,
    UserModule,
    DevicesModule,
    ReviewsModule,
    CategoriesModule,
    // Configuration
    // https://docs.nestjs.com/techniques/configuration
    // ConfigModule.forRoot({
    //   isGlobal: true,
    //   load: [configuration],
    // }),
    // CommonModule,
    CacheModule.register({
      isGlobal: true,
    }),
    // Static Folder
    // https://docs.nestjs.com/recipes/serve-static
    // https://docs.nestjs.com/techniques/mvc
    // ServeStaticModule.forRoot({
    //   rootPath: `${__dirname}/../public`,
    //   renderPath: '/',
    // }),
    // Module Router
    // https://docs.nestjs.com/recipes/router-module
    // RouterModule.register([
    //   {
    //     path: 'test',
    //     module: SampleModule,
    //   },
    //   {
    //     path: 'test',
    //     module: DebugSampleModule,
    //   },
    // ]),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
    // // Global Pipe, Validation check
    // // https://docs.nestjs.com/pipes#global-scoped-pipes
    // // https://docs.nestjs.com/techniques/validation
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        // disableErrorMessages: true,
        transform: true, // transform object to DTO class
        whitelist: true,
      }),
    },
  ],
})
export class AppModule {}
