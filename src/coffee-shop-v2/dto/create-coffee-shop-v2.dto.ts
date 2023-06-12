import { OmitType } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, IsDefined } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { AddDeviceDto } from './add-device.dto';
import { Expose, Transform } from 'class-transformer';

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

  @IsOptional()
  @ApiProperty({ type: () => AddDeviceDto, isArray: true })
  devices: AddDeviceDto[];

  @IsOptional()
  // @IsNumber({}, { each: true })
  // @Expose()
  @Transform(({ obj }) => {
    const arr = obj.crowded_hours.flat();
    if (arr.length !== 24) {
      throw new Error('crowded_hours must be 24 elements');
    }
  })
  @ApiProperty({
    type: () => Number,
    isArray: true,
    default: [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ],
  })
  crowded_hours: number[];
}
