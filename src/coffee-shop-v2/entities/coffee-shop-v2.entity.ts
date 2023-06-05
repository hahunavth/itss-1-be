import { IsString, IsNumber, IsOptional, IsDefined } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { coffee_shops } from '@prisma/client';
import { CreateDeviceDto } from '@src/devices';
import { AddDeviceDto } from '../dto/add-device.dto';
import { Type } from 'class-transformer';

export class CoffeeShopV2Entity implements coffee_shops {
  @IsNumber()
  id: number;
  @IsNumber()
  owner_ID: number;
  @ApiProperty()
  @IsString()
  name: string;
  @IsString()
  business_hours: string;
  @IsString()
  description: string;
  @IsString()
  phone_number: string;

  @IsNumber()
  status: number;
  @IsString()
  address: string;
  @IsNumber()
  verified: number;

  @IsString({ each: true })
  categories: string[];

  @IsDefined()
  @ApiProperty({ type: () => [AddDeviceDto], isArray: true })
  devices: AddDeviceDto[];
}
