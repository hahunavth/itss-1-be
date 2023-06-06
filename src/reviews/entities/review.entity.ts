import { OmitType } from '@nestjs/swagger';
import { IsDate, IsNumber, IsString, Max, Min } from 'class-validator';

export class Image {
  @IsString()
  image_url: string;

  @IsNumber()
  coffee_shop_ID: number;
  @IsNumber()
  review_ID: number;
}

export class ReviewEntity {
  @IsNumber()
  id: number;
  @IsString()
  review: string;

  @IsNumber()
  @Min(1)
  @Max(5)
  star: number;

  @IsDate()
  create_at: Date;

  @IsNumber()
  user_ID: number;
  @IsNumber()
  coffee_shop_ID: number;

  images: Image[];
}
