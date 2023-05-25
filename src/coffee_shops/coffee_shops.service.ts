import { CRUDService } from '@app/prisma-crud';
import { Injectable } from '@nestjs/common';
import { CoffeeShopEntity } from './entities';
import { CreateCoffeeShopDto, UpdateCoffeeShopDto } from './dto';
import { PrismaService } from '@src/common';

@Injectable()
export class CoffeeShopService extends CRUDService<
  CoffeeShopEntity,
  CreateCoffeeShopDto,
  UpdateCoffeeShopDto
> {
  constructor(private prisma: PrismaService) {
    super(prisma.coffee_shops, prisma);
  }
}
