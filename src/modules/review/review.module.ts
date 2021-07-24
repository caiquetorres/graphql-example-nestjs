import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Review } from './entities/review.entity'

import { ReviewRelationsService } from './services/review-relations.service'
import { ReviewService } from './services/review.service'

import { ReviewRelationsResolver } from './resolvers/review-relations.resolver'
import { ReviewResolver } from './resolvers/review.resolver'

@Module({
  imports: [TypeOrmModule.forFeature([Review])],
  providers: [
    ReviewService,
    ReviewResolver,
    ReviewRelationsService,
    ReviewRelationsResolver,
  ],
  exports: [ReviewService],
})
export class ReviewModule {}
