import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class AttrQueryCoffeeShopDto {
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
