import { Injectable } from '@nestjs/common';
import { PrismaCrudService } from 'nestjs-prisma-crud';

@Injectable()
export class DevicesService extends PrismaCrudService {
  constructor() {
    super({
      model: 'devices',
      allowedJoins: [],
      defaultJoins: [],
    });
  }

  // /**
  //  * Add new device if not exists
  //  * Add new coffee shop device if not exists
  //  * @param coffeeShopId
  //  * @param deviceId
  //  */
  // async addCoffeeShopDevice(coffeeShopId: number, deviceId: number) {

  // }
}
