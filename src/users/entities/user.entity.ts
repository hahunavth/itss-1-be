import { IsString, IsNumber, IsDate } from 'class-validator';
import { users } from '@prisma/client';
import { Type } from 'class-transformer';

export class UserEntity implements users {
  @IsNumber()
  id: number;
  @IsString()
  password: string;
  @IsString()
  email: string;
  @IsString()
  username: string;
  @IsString()
  phone_number: string;
  @IsDate()
  @Type(() => Date)
  date_of_birth: Date;
  @IsString()
  image_url: string;
  @IsNumber()
  role: number;
}