import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { UserReviewsController } from './user-review.controller';

@Module({
  controllers: [ReviewsController, UserReviewsController],
  providers: [ReviewsService],
})
export class ReviewsModule {}
