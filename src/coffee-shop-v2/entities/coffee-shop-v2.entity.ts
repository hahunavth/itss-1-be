import { IsString, IsNumber, IsOptional, IsDefined } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { coffee_shops } from '@prisma/client';
import { CreateDeviceDto } from '@src/devices';
import { AddDeviceDto } from '../dto/add-device.dto';
import { Type } from 'class-transformer';

export class ReviewSummaryDto {
  @IsNumber()
  star: number;
  @IsNumber()
  count: number;
}

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
  @ApiProperty({ type: () => AddDeviceDto, isArray: true })
  devices: AddDeviceDto[];

  @ApiProperty({
    type: () => ReviewSummaryDto,
    description: 'Người dùng review điều hòa của shop',
  })
  review: ReviewSummaryDto;

  @IsOptional()
  @IsNumber({}, { each: true })
  @ApiProperty({
    type: () => Number,
    isArray: true,
    default: [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
  })
  crowded_hours: number[];
}
