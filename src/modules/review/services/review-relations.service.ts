import { TypeOrmQueryService } from '@nestjs-query/query-typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Review } from '../entities/review.entity'

export class ReviewRelationsService extends TypeOrmQueryService<Review> {
  public constructor(
    @InjectRepository(Review)
    public readonly reviewRepository: Repository<Review>,
  ) {
    super(reviewRepository)
  }
}
