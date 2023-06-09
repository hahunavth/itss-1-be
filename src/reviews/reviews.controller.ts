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
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { QueryReviewsDto } from './dto/query-reviews.dto';
import { PaginateQueryDto } from '@src/dto/query-paginate.dto';
import { SortReviewsDto } from './dto/sort-reviews.dto';

@ApiTags('reviews')
@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  // @Post()
  // create(@Body() createReviewDto: CreateReviewDto) {
  //   return this.reviewsService.create(createReviewDto);
  // }

  @ApiOperation({
    summary:
      'Sprint 2 - Task 13: Get all reviews; Sprint 3 - Task 6: review filter by user nationality',
  })
  @Get()
  async findAll(
    @Query() paginate: PaginateQueryDto,
    @Query() query: QueryReviewsDto,
    @Query() sort: SortReviewsDto,
  ) {
    return {
      data: await this.reviewsService.findAll(query.toQuery(), paginate, sort),
      ...(paginate.toQuery() || {}),
    };
  }

  @Get(':review_ID')
  findOne(@Param('review_ID') id: string) {
    return this.reviewsService.findOne(+id);
  }

  @Patch(':review_ID')
  update(
    @Param('review_ID') id: string,
    @Body() updateReviewDto: UpdateReviewDto,
  ) {
    return this.reviewsService.update(+id, updateReviewDto);
  }

  @Delete(':review_ID')
  remove(@Param('review_ID') id: string) {
    return this.reviewsService.remove(+id);
  }
}
