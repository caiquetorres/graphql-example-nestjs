import { ConnectionType } from '@nestjs-query/query-graphql'
import { Args, Parent, ResolveField, Resolver } from '@nestjs/graphql'

import { Comment } from '../../comment/entities/comment.entity'
import { Post } from '../../post/entities/post.entity'
import { User } from '../entities/user.entity'

import { QueryCommentsArgs } from '../../comment/dtos/query-comments.args'
import { QueryPostsArgs } from '../../post/dtos/query-posts.args'

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
   * @param parent defines an object that represents the parent of the
   * current sent query
   * @param queryArgs defines the how the data will be returned
   * (paging, filtering and sorting)
   * @returns all the found entities paginated
   */
  @ResolveField(() => QueryPostsArgs.ConnectionType, {
    name: 'posts',
  })
  public async getManyPosts(
    @Parent()
    parent: User,
    @Args()
    queryArgs: QueryPostsArgs,
  ): Promise<ConnectionType<Post>> {
    return await this.userRelationsService.getManyPostsByUserId(
      parent.id,
      queryArgs,
    )
  }

  /**
   * Method that searches for entities based on the parent
   *
   * @param parent defines an object that represents the parent of the
   * current sent query
   * @param queryArgs defines the how the data will be returned
   * (paging, filtering and sorting)
   * @returns all the found entities paginated
   */
  @ResolveField(() => QueryCommentsArgs.ConnectionType, {
    name: 'comments',
  })
  public async getManyComments(
    @Parent()
    parent: User,
    @Args()
    queryArgs: QueryCommentsArgs,
  ): Promise<ConnectionType<Comment>> {
    return await this.userRelationsService.getManyCommentsByUserId(
      parent.id,
      queryArgs,
    )
  }
}
