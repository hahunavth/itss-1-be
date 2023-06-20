import { ApiProperty, OmitType } from '@nestjs/swagger';
import { UpdateReviewDto } from './update-review.dto';
import { IsEnum, IsOptional } from 'class-validator';

export class QueryReviewsDto extends OmitType(UpdateReviewDto, [
  'images',
  'review',
]) {}
