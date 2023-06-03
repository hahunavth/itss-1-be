import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { DevicesService } from './devices.service';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Devices')
@Controller('Devices')
export class DevicesController {
  constructor(private readonly devicesService: DevicesService) {}

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

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.devicesService.remove(id, { crudQuery: {} });
  }
}
