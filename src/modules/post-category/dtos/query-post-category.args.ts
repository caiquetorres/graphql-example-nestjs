import { QueryArgsType } from '@nestjs-query/query-graphql'
import { ArgsType } from '@nestjs/graphql'

import { PostCategory } from '../entities/post-category.entity'

/**
 * The class that represents the arguments sent to the api for
 * fetching posts
 */
@ArgsType()
export class QueryPostsCategoryArgs extends QueryArgsType(PostCategory) {}
