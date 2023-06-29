import { ApiProperty, OmitType } from '@nestjs/swagger';
import { UpdateReviewDto } from './update-review.dto';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class QueryReviewsDto extends OmitType(UpdateReviewDto, [
  'images',
  'review',
]) {
  @IsOptional()
  @IsString({ each: true })
  user_nationality_whitelist?: string[];
  @IsOptional()
  @IsString({ each: true })
  user_nationality_blacklist?: string[];

  public toQuery() {
    const user_nationality_whitelist = this.user_nationality_whitelist
      ? { in: this.user_nationality_whitelist }
      : {};
    const user_nationality_blacklist = this.user_nationality_blacklist
      ? { notIn: this.user_nationality_blacklist }
      : {};

    const attrQuery = {
      ...this,
    };
    delete attrQuery.user_nationality_whitelist;
    delete attrQuery.user_nationality_blacklist;

    return {
      ...attrQuery,
      user: {
        nationality: {
          ...user_nationality_whitelist,
          ...user_nationality_blacklist,
        },
      },
    };
  }
}
