import { IsString, IsNumber, IsDate, IsEmail } from 'class-validator';
import { users } from '@prisma/client';
import { Type } from 'class-transformer';

export class UserEntity implements users {
  @IsNumber()
  @Type(() => Number)
  id: number;
  @IsString()
  password: string;
  @IsEmail()
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
  @Type(() => Number)
  role: number;
}
