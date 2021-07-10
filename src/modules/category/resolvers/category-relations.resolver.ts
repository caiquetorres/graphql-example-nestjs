import { ConnectionType } from '@nestjs-query/query-graphql'
import { Args, Parent, ResolveField, Resolver } from '@nestjs/graphql'

import { Category } from '../entities/category.entity'
import { Post } from 'src/modules/post/entities/post.entity'

import { QueryPostsArgs } from 'src/modules/post/dtos/query-posts.args'

import { CategoryRelationsService } from '../services/category-relations.service'

/**
 * The class that represents the resolver that deals with the category
 * relations
 */
@Resolver(() => Category)
export class CategoryRelationsResolver {
  public constructor(
    private readonly categoryRelationsService: CategoryRelationsService,
  ) {}

  /**
   * Method that searches for entities based on the sent query
   *
   * @param queryArgs defines the how the data will be returned
   * (paging, filtering and sorting)
   * @param parent defines an object that represents the parent of the
   * current sent query
   * @returns all the found entities paginated
   */
  @ResolveField(() => QueryPostsArgs.ConnectionType, {
    name: 'posts',
  })
  public async getManyPosts(
    @Args()
    queryArgs: QueryPostsArgs,
    @Parent()
    parent: Category,
  ): Promise<ConnectionType<Post>> {
    return await this.categoryRelationsService.getManyPostsByCategoryId(
      parent.id,
      queryArgs,
    )
  }
}
