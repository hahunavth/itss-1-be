import { OmitType } from '@nestjs/swagger';
import { ReviewEntity } from '../entities/review.entity';
import { IsDefined, IsString } from 'class-validator';

export class CreateReviewDto extends OmitType(ReviewEntity, [
  'id',
  'create_at',
  'images',
]) {
  @IsDefined()
  @IsString({ each: true })
  images: string[];
}
