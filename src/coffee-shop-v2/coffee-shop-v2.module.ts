import { Module } from '@nestjs/common';
import { CoffeeShopV2Service } from './coffee-shop-v2.service';
import { CoffeeShopV2Controller } from './coffee-shop-v2.controller';

@Module({
  controllers: [CoffeeShopV2Controller],
  providers: [CoffeeShopV2Service],
})
export class CoffeeShopV2Module {}
