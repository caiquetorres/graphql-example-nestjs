import { ConnectionType } from '@nestjs-query/query-graphql'
import { TypeOrmQueryService } from '@nestjs-query/query-typeorm'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Comment } from '../../comment/entities/comment.entity'
import { Post } from '../../post/entities/post.entity'
import { User } from '../entities/user.entity'

import { QueryCommentsArgs } from '../../comment/dtos/query-comments.args'
import { QueryPostsArgs } from '../../post/dtos/query-posts.args'

/**
 * The class that represents the service that deals with the users
 */
@Injectable()
export class UserRelationsService extends TypeOrmQueryService<User> {
  public constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    super(userRepository)
  }

  /**
   * Method that searches for entities based on the parent
   *
   * @param userId defines the entity id
   * @param queryArgs defines the how the data will be returned
   * (paging, filtering and sorting)
   * @returns all the round elements paginated
   */
  public async getManyPostsByUserId(
    userId: string,
    queryArgs: QueryPostsArgs,
  ): Promise<ConnectionType<Post>> {
    const user = await this.userRepository.findOne(userId)

    return await QueryPostsArgs.ConnectionType.createFromPromise(
      (query) => this.queryRelations(Post, 'posts', user, query),
      queryArgs,
    )
  }

  /**
   * Method that searches for entities based on the parent
   *
   * @param userId defines the entity id
   * @param queryArgs defines the how the data will be returned
   * (paging, filtering and sorting)
   * @returns all the round elements paginated
   */
  public async getManyCommentsByUserId(
    userId: string,
    queryArgs: QueryCommentsArgs,
  ): Promise<ConnectionType<Comment>> {
    const user = await this.userRepository.findOne(userId)

    return await QueryCommentsArgs.ConnectionType.createFromPromise(
      (query) => this.queryRelations(Comment, 'comments', user, query),
      queryArgs,
    )
  }
}
