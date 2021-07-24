import { Resolver } from '@nestjs/graphql'

import { Review } from '../entities/review.entity'

import { ReviewService } from '../services/review.service'

@Resolver(() => Review)
export class ReviewResolver {
  public constructor(private readonly reviewService: ReviewService) {}
}
