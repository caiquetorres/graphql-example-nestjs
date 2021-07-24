import { Resolver } from '@nestjs/graphql'

import { Review } from '../entities/review.entity'

import { ReviewRelationsService } from '../services/review-relations.service'

@Resolver(() => Review)
export class ReviewRelationsResolver {
  public constructor(
    private readonly reviewRelationsService: ReviewRelationsService,
  ) {}
}
