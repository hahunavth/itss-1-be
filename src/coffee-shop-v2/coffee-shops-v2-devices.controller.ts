import {
  Controller,
  Post,
  Body,
  Param,
  NotFoundException,
  BadRequestException,
  Put,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { PrismaService } from '@src/common';
import { AddDeviceDto } from './dto/add-device.dto';
import { SetDevicesDto } from './dto/set-devices.dto';

/**
 * @deprecated
 */
@ApiTags('coffee-shops-v2')
@Controller('coffee-shops')
export class CoffeeShopsV2DevicesController {
  constructor(private readonly prismaService: PrismaService) {}

  @ApiOperation({
    summary: 'Set device list to a coffee shop',
  })
  @ApiNotFoundResponse({
    description: 'Coffee shop not found',
  })
  @ApiBadRequestResponse({
    description: 'Coffee shop already has this device',
  })
  @Put(':id/devices')
  async addDevice(
    @Param('id') coffeeShopId: number,
    @Body() setDevicesDto: SetDevicesDto,
  ) {
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
