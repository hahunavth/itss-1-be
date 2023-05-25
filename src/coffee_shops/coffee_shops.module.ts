import { Module } from '@nestjs/common';
import { PrismaModule } from '@src/common/prisma/prisma.module';
import { CoffeeShopController } from './coffee_shops.controller';
import { CoffeeShopService } from './coffee_shops.service';

@Module({
  imports: [PrismaModule],
  controllers: [CoffeeShopController],
  providers: [CoffeeShopService],
})
export class CoffeeShopModule {}
