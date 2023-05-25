import { ApiProperty } from '@nestjs/swagger';
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
  status: number;
  @IsString()
  address: string;
  @IsNumber()
  verified: number;
}
