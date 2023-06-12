import { IsString, IsNumber, IsOptional } from 'class-validator';

import { coffee_shops } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class CoffeeShopEntity implements coffee_shops {
  @IsNumber()
  id: number;

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
