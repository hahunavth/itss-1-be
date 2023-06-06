import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { DevicesService } from './devices.service';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { PrismaService } from '@src/common';
import { AddDeviceDto } from '../coffee-shop-v2/dto/add-device.dto';

@ApiTags('devices')
@Controller('devices')
export class DevicesController {
  constructor(
    private readonly devicesService: DevicesService,
    private readonly prismaService: PrismaService,
  ) {}

  @Post()
  async create(@Body() createDeviceDto: CreateDeviceDto) {
    const created = await this.devicesService.create(createDeviceDto, {
      crudQuery: {},
    });
    return created;
  }

  @Get()
  async findMany() {
    const matches = await this.devicesService.findMany({ crudQuery: {} });
    return matches;
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateDeviceDto: UpdateDeviceDto,
  ) {
    const updated = await this.devicesService.update(id, updateDeviceDto, {
      crudQuery: {},
    });
    return updated;
  }

  @ApiOperation({
    summary: 'Delete a device (and all relations with coffee_shops)',
  })
  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.devicesService.remove(id, { crudQuery: {} });
  }
}
