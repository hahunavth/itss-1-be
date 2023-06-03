import { Injectable } from '@nestjs/common';
import { PrismaCrudService } from 'nestjs-prisma-crud';

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
}
