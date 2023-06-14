import { OmitType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsNumber, IsString, Max, Min } from 'class-validator';

export class Image {
  @IsString()
  image_url: string;

  @IsNumber()
  @Type(() => Number)
  coffee_shop_ID: number;
  @IsNumber()
  @Type(() => Number)
  review_ID: number;
}

export class ReviewEntity {
  @IsNumber()
  @Type(() => Number)
  @Type(() => Number)
  id: number;
  @IsString()
  review: string;

  @IsNumber()
  @Type(() => Number)
  @Type(() => Number)
  @Min(1)
  @Max(5)
  star: number;

  @IsDate()
  create_at: Date;

  @IsNumber()
  @Type(() => Number)
  @Type(() => Number)
  user_ID: number;
  @IsNumber()
  @Type(() => Number)
  @Type(() => Number)
  coffee_shop_ID: number;

  images: Image[];
}
