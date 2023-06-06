import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { UserReviewsController } from './user-review.controller';
import { PrismaModule } from '@src/common';

@Module({
  imports: [PrismaModule],
  controllers: [ReviewsController, UserReviewsController],
  providers: [ReviewsService],
})
export class ReviewsModule {}
