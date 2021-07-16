import { Resolver } from '@nestjs/graphql'

import { PostCategoryService } from '../services/post-category.service'

@Resolver()
export class PostCategoryResolver {
  public constructor(
    private readonly postCategoryService: PostCategoryService,
  ) {}
}
