import { QueryArgsType } from '@nestjs-query/query-graphql'
import { ArgsType } from '@nestjs/graphql'

import { Post } from '../entities/post.entity'

/**
 * The class that represents the arguments sent to the api for
 * fetching posts
 */
@ArgsType()
export class PostQueryArgs extends QueryArgsType(Post) {}
