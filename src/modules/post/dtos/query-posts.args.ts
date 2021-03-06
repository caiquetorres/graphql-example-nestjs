import { QueryArgsType } from '@nestjs-query/query-graphql'
import { ArgsType } from '@nestjs/graphql'

import { Post } from '../entities/post.entity'

/**
 * The class that represents the arguments sent to the api for
 * fetching reviews
 */
@ArgsType()
export class QueryPostsArgs extends QueryArgsType(Post) {}
