import { OmitType } from '@nestjs/swagger';
import { UpdateReviewDto } from './update-review.dto';

export class QueryReviewsDto extends OmitType(UpdateReviewDto, [
  'images',
  'review',
]) {}
