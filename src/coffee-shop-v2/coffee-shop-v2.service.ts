import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaCrudService } from 'nestjs-prisma-crud';
import { CoffeeShopV2Entity } from './entities/coffee-shop-v2.entity';
import {
  PrismaService,
  flattenPrismaMNJoin,
  flattenPrismaMNJoinMany,
} from '@src/common';
import { SetCategoriesDto } from './dto/set-categories.dto';
import { SetDevicesDto } from './dto/set-devices.dto';

@Injectable()
export class CoffeeShopV2Service extends PrismaCrudService {
  constructor(private readonly prismaService: PrismaService) {
    super({
      model: 'coffee_shops',
      allowedJoins: [
        'user',
        'bookmarks',
        'coffee_shop_devices.device',
        'coffee_shop_categories.category',
        'categories.hasEvery',
        'coffee_shop_categories.categories.hasEvery',
        'crowded_hours',
        // 'images',
        'rv_images',
      ],
      defaultJoins: [
        'user',
        // 'images',
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

  async setCategories(coffeeShopId: number, setCategoryDto: SetCategoriesDto) {
    const categories = setCategoryDto.categories;

    // find coffee shop
    const coffeeShop = await this.prismaService.coffee_shops.findFirst({
      where: {
        id: {
          equals: coffeeShopId,
        },
      },
    });
    if (!coffeeShop) {
      throw new NotFoundException('Coffee shop not found');
    }

    // delete all coffee_shop_categories of this coffee shop
    await this.prismaService.coffee_shop_categories.deleteMany({
      where: {
        coffee_shop_ID: {
          equals: coffeeShopId,
        },
      },
    });

    // find all categories
    const categoryList = await this.prismaService.categories.findMany({
      where: {
        name: {
          in: categories,
        },
      },
    });
    const notExistsCategories = categories.filter(
      (c) => !categoryList.find((cl) => cl.name === c),
    );
    if (notExistsCategories.length > 0) {
      throw new BadRequestException(
        `Categories not found: ${notExistsCategories.join(', ')}`,
      );
      // // create
      // const newCategories = await Promise.all(
      //   notExistsCategories.map(async (c) => {
      //     return await this.prismaService.categories.create({
      //       data: {
      //         name: c,
      //       },
      //     });
      //   }),
      // );
      // categoryList.push(...newCategories);
    }

    // create new coffee_shop_categories
    const newCoffeeShopCategories = await Promise.all(
      categoryList.map(async (c) => {
        return await this.prismaService.coffee_shop_categories.create({
          data: {
            coffee_shop_ID: coffeeShopId,
            category_ID: c.id,
          },
        });
      }),
    );

    return newCoffeeShopCategories;
  }

  async setDevices(coffeeShopId: number, setDevicesDto: SetDevicesDto) {
    // find coffee shop
    const coffeeShop = await this.prismaService.coffee_shops.findFirst({
      where: {
        id: {
          equals: coffeeShopId,
        },
      },
    });
    if (!coffeeShop) {
      throw new NotFoundException('Coffee shop not found');
    }

    // // find device, if not exist, create new
    // let device = await this.prismaService.devices.findFirst({
    //   where: {
    //     name: {
    //       equals: addDeviceDto.name,
    //     },
    //   },
    // });
    // if (!device) {
    //   device = await this.prismaService.devices.create({
    //     data: {
    //       name: addDeviceDto.name,
    //       // coffee_shop_devices
    //     },
    //   });
    // }

    // find all devices
    const deviceList = await this.prismaService.devices.findMany({
      where: {
        name: {
          in: setDevicesDto.devices.map((device) => device.name),
        },
      },
    });
    if (deviceList.length !== setDevicesDto.devices.length) {
      const notExistsDeviceNames = setDevicesDto.devices
        .map((device) => device.name)
        .filter(
          (name) => !deviceList.map((device) => device.name).includes(name),
        );
      throw new NotFoundException(
        `Device(s) not found: ${notExistsDeviceNames.join(', ')}`,
      );
    }

    // // check if coffee_shop_devices already exist
    // const coffeeShopDevice =
    //   await this.prismaService.coffee_shop_devices.findFirst({
    //     where: {
    //       coffee_shop_ID: {
    //         equals: coffeeShopId,
    //       },
    //       device_ID: {
    //         equals: device.id,
    //       },
    //     },
    //   });
    // if (coffeeShopDevice) {
    //   throw new BadRequestException('Device already exist');
    // }

    // delete all coffee_shop_devices of this coffee shop
    await this.prismaService.coffee_shop_devices.deleteMany({
      where: {
        coffee_shop_ID: {
          equals: coffeeShopId,
        },
      },
    });

    // create coffee_shop_devices relation
    // const newCoffeeShopDevice =
    //   await this.prismaService.coffee_shop_devices.create({
    //     data: {
    //       coffee_shop_ID: coffeeShopId,
    //       device_ID: device.id,
    //       quantity: addDeviceDto.quantity,
    //       status: addDeviceDto.status,
    //     },
    //   });
    const newCoffeeShopDevices = await Promise.all(
      setDevicesDto.devices.map((device) => {
        return this.prismaService.coffee_shop_devices.create({
          data: {
            coffee_shop_ID: coffeeShopId,
            device_ID: deviceList.find((d) => d.name === device.name).id,
            quantity: device.quantity,
            status: device.status,
          },
        });
      }),
    );

    return {
      devices: newCoffeeShopDevices,
    };
  }
}
