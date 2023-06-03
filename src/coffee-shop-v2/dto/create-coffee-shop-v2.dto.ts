import { OmitType } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCoffeeShopV2Dto {
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

  @IsOptional()
  @IsString({ each: true })
  categories: string[];
}
