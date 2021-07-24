import { QueryArgsType } from '@nestjs-query/query-graphql'
import { ArgsType } from '@nestjs/graphql'

import { Comment } from 'src/modules/comment/entities/comment.entity'

/**
 * The class that represents the arguments sent to the api for
 * fetching reviews
 */
@ArgsType()
export class QueryCommentsArgs extends QueryArgsType(Comment) {}
