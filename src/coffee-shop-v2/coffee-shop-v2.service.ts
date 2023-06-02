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
        'coffee_shop_categories',
        'coffee_shop_devices',
      ],
      defaultJoins: ['user', 'coffee_shop_categories', 'coffee_shop_devices'],
    });
  }
}
