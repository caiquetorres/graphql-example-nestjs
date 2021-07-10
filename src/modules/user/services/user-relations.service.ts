import { ConnectionType } from '@nestjs-query/query-graphql'
import { Injectable } from '@nestjs/common'

import { Post } from 'src/modules/post/entities/post.entity'

import { QueryPostsArgs } from 'src/modules/post/dtos/query-posts.args'

import { PostService } from 'src/modules/post/services/post.service'

/**
 * The class that represents the service that deals with the users
 */
@Injectable()
export class UserRelationsService {
  public constructor(private readonly postService: PostService) {}

  /**
   * Method that searches for entities based on the parent
   *
   * @param userId defines the entity id
   * @param queryArgs defines the how the data will be returned
   * (paging, filtering and sorting)
   * @returns all the round elements paginated
   */
  public async getManyByUserId(
    userId: string,
    queryArgs: QueryPostsArgs,
  ): Promise<ConnectionType<Post>> {
    queryArgs = {
      ...queryArgs,
      filter: {
        ...queryArgs.filter,
        userId: {
          ...queryArgs.filter.userId,
          eq: userId,
        },
      },
    }

    return await QueryPostsArgs.ConnectionType.createFromPromise(
      (query) => this.postService.query(query),
      queryArgs,
    )
  }
}
