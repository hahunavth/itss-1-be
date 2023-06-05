import { Injectable } from '@nestjs/common';
import { PrismaCrudService } from 'nestjs-prisma-crud';
import { CoffeeShopV2Entity } from './entities/coffee-shop-v2.entity';
import { flattenPrismaMNJoin, flattenPrismaMNJoinMany } from '@src/common';

@Injectable()
export class CoffeeShopV2Service extends PrismaCrudService {
  constructor() {
    super({
      model: 'coffee_shops',
      allowedJoins: [
        'user',
        'bookmarks',
        'coffee_shop_devices.device',
        'coffee_shop_categories.category',
        'categories.hasEvery',
        'coffee_shop_categories.categories.hasEvery',
      ],
      defaultJoins: [
        'user',
        'coffee_shop_categories.category',
        'coffee_shop_devices.device',
      ],
    });
  }

  /**
   * Prisma nested nn join to entity list
   * @param arr list of prisma joined result
   * @returns
   */
  async transformPrismaNestedJoinToEntityList(
    arr: any,
  ): Promise<CoffeeShopV2Entity[]> {
    let result = arr;

    result = flattenPrismaMNJoinMany(
      result,
      'coffee_shop_categories',
      'category',
      [],
    );

    result = flattenPrismaMNJoinMany(result, 'coffee_shop_devices', 'device', [
      'quantity',
      'status',
    ]);

    return result;
  }

  /**
   * Prisma nested nn join to entity
   * @param obj
   * @returns
   */
  async transformPrismaNestedJoinToEntity(
    obj: any,
  ): Promise<CoffeeShopV2Entity> {
    let result = obj;

    result = flattenPrismaMNJoin(
      result,
      'coffee_shop_categories',
      'category',
      [],
    );

    result = flattenPrismaMNJoin(result, 'coffee_shop_devices', 'device', [
      'quantity',
      'status',
    ]);

    return result;
  }
}
