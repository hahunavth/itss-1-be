import { OmitType } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  IsOptional,
  IsDefined,
  IsDate,
  IsPhoneNumber,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { AddDeviceDto } from './add-device.dto';
import { Expose, Transform, Type } from 'class-transformer';
import { HttpException, HttpStatus } from '@nestjs/common';

export class CreateCoffeeShopV2Dto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Bắt đầu mở từ thời gian này',
    type: String,
    default: '09:30',
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
    description: 'Đóng cửa từ thời gian này',
    type: String,
    default: '17:30',
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
  @IsPhoneNumber('VN')
  phone_number: string;

  @IsNumber()
  @Type(() => Number)
  status: number;
  @IsString()
  address: string;
  @IsNumber()
  @Type(() => Number)
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
  /**
   * REVIEW: This transform will run twice on validation pipe and transform
   */
  @Transform(({ obj }) => {
    // console.log('obj.crowded_hours');
    // console.log(obj.crowded_hours);
    // console.log('obj.crowded_hours');
    const arr = obj.crowded_hours.flat();
    if (arr.length !== 48) {
      throw new Error('crowded_hours must be 48 elements');
    }
    return arr;
  })
  @ApiProperty({
    // type: () => Number,
    // isArray: true,
    default: [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ],
  })
  crowded_hours: number[];
}
