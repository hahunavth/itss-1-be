import { IsString, IsNumber } from 'class-validator';

import { coffee_shops } from '@prisma/client';

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
}
