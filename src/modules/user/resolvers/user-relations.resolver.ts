import { ConnectionType } from '@nestjs-query/query-graphql'
import { Args, Parent, ResolveField, Resolver } from '@nestjs/graphql'

import { User } from '../entities/user.entity'
import { Post } from 'src/modules/post/entities/post.entity'

import { QueryPostsArgs } from 'src/modules/post/dtos/query-posts.args'

import { UserRelationsService } from '../services/user-relations.service'

/**
 * The class that represents the resolver that deals with the users
 */
@Resolver(() => User)
export class UserRelationsResolver {
  public constructor(
    private readonly userRelationsService: UserRelationsService,
  ) {}

  /**
   * Method that searches for entities based on the parent
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
    parent: User,
  ): Promise<ConnectionType<Post>> {
    return await this.userRelationsService.getManyByUserId(parent.id, queryArgs)
  }
}
