import {
  IsString,
  IsNumber,
  IsOptional,
  IsDefined,
  IsDate,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { coffee_shops } from '@prisma/client';
import { CreateDeviceDto } from '@src/devices';
import { AddDeviceDto } from '../dto/add-device.dto';
import { Transform, Type } from 'class-transformer';
import { HttpException, HttpStatus } from '@nestjs/common';

export class ReviewSummaryDto {
  @IsNumber()
  @Type(() => Number)
  star: number;
  @IsNumber()
  @Type(() => Number)
  count: number;
}

export class CoffeeShopV2Entity implements coffee_shops {
  @IsNumber()
  @Type(() => Number)
  id: number;
  @IsNumber()
  @Type(() => Number)
  owner_ID: number;
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Bắt đầu mở từ thời gian này',
    type: String,
  })
  @IsDate()
  opening_at: Date;

  @ApiProperty({
    description: 'Bắt đầu mở từ thời gian này',
    type: String,
  })
  @IsDate()
  closing_at: Date;

  @IsString()
  description: string;
  @IsString()
  phone_number: string;

  @IsNumber()
  @Type(() => Number)
  status: number;
  @IsString()
  address: string;
  @IsNumber()
  @Type(() => Number)
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
  // @Transform(({ obj }) => {
  //   const arr = obj.crowded_hours.flat();
  //   if (arr.length !== 48) {
  //     throw new Error('crowded_hours must be 48 elements');
  //   }
  // })
  crowded_hours: number[];
}
