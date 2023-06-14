import { IsString, IsNumber, IsOptional, IsDate } from 'class-validator';

import { coffee_shops } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { HttpException, HttpStatus } from '@nestjs/common';

export class CoffeeShopEntity implements coffee_shops {
  @IsNumber()
  @Type(() => Number)
  id: number;

  @IsString()
  name: string;
  @ApiProperty({
    description: 'Bắt đầu mở từ thời gian này',
    type: String,
  })
  @IsDate()
  @Transform(({ obj }) => {
    const value = obj.opening_at;
    if (typeof value === 'string') {
      if (value.match(/^\d{2}:\d{2}$/))
        return new Date(`${'1970-01-01T'}${value}:00Z`);
      else
        throw new HttpException(
          'Invalid opening_at: require HH:mm format but got ' + value,
          HttpStatus.BAD_REQUEST,
        );
    }
    return value;
  })
  opening_at: Date;

  @ApiProperty({
    description: 'Bắt đầu mở từ thời gian này',
    type: String,
  })
  @IsDate()
  @Transform(({ obj }) => {
    const value = obj.closing_at;
    if (typeof value === 'string') {
      if (value.match(/^\d{2}:\d{2}$/)) {
        if (value > obj.opening_at)
          return new Date(`${'1970-01-01T'}${value}:00Z`);
        else return new Date(`${'1970-01-02T'}${value}:00Z`);
      } else
        throw new HttpException(
          'Invalid closing_at: require HH:mm format but got ' + value,
          HttpStatus.BAD_REQUEST,
        );
    }
    return value;
  })
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

  owner_ID: number;

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
