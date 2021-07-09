import { Resolver } from '@nestjs/graphql'

import { PostService } from '../services/post.service'

/**
 * The class that represents te resolver that deals with the posts
 */
@Resolver()
export class PostResolver {
  public constructor(private readonly postService: PostService) {}
}
