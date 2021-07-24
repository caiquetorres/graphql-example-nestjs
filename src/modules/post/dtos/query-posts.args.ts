import { QueryArgsType } from '@nestjs-query/query-graphql'
import { ArgsType } from '@nestjs/graphql'

import { Review } from 'src/modules/review/entities/review.entity'

/**
 * The class that represents the arguments sent to the api for
 * fetching reviews
 */
@ArgsType()
export class QueryReviewArgs extends QueryArgsType(Review) {}
