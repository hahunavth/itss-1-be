import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { ApiOperation, ApiTags, OmitType } from '@nestjs/swagger';
import { QueryReviewsDto } from './dto/query-reviews.dto';

class UserCreateReviewsDto extends OmitType(CreateReviewDto, ['user_ID']) {}

@ApiTags('reviews')
@Controller('users/:user_ID/reviews')
export class UserReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @ApiOperation({
    summary: 'Sprint 2 - Task 16: Create review',
  })
  @Post()
  create(
    @Param('user_ID') user_ID: number,
    @Body() createReviewDto: UserCreateReviewsDto,
  ) {
    return this.reviewsService.create({
      ...createReviewDto,
      user_ID,
    });
  }

  @Get()
  findAll(@Param('user_ID') user_ID: number, @Query() query: QueryReviewsDto) {
    return this.reviewsService.findAll(query);
  }

  // @Get(':coffee_shop_ID')
  // findOne(
  //   @Param('user_ID') user_ID: number,
  //   @Param('coffee_shop_ID') id: string,
  // ) {
  //   return this.reviewsService.findOne(+id);
  // }

  // @Delete(':coffee_shop_ID')
  // remove(
  //   @Param('user_ID') user_ID: number,
  //   @Param('coffee_shop_ID') id: string,
  // ) {
  //   return this.reviewsService.remove(+id);
  // }
}
