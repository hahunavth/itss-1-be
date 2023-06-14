import { OmitType } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { CoffeeShopEntity } from '../entities/coffee_shop.entity';
import { Type } from 'class-transformer';

export class CreateCoffeeShopDto extends OmitType(CoffeeShopEntity, [
  'id',
] as const) {
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
  @Type(() => Number)
  status: number;
  @IsString()
  address: string;
  @IsNumber()
  @Type(() => Number)
  verified: number;
}
