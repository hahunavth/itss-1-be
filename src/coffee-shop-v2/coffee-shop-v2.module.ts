import { Module } from '@nestjs/common';
import { CoffeeShopV2Service } from './coffee-shop-v2.service';
import { CoffeeShopV2Controller } from './coffee-shop-v2.controller';
import { PrismaModule } from '@src/common';
// import { CoffeeShopsV2CategoriesController } from './coffee-shops-v2-categories.controller';
// import { CoffeeShopsV2DevicesController } from './coffee-shops-v2-devices.controller';

@Module({
  imports: [PrismaModule],
  controllers: [
    CoffeeShopV2Controller,
    // CoffeeShopsV2CategoriesController,
    // CoffeeShopsV2DevicesController,
  ],
  providers: [CoffeeShopV2Service],
})
export class CoffeeShopV2Module {}
