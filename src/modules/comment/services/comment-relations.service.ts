import { TypeOrmQueryService } from '@nestjs-query/query-typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Post } from '../../post/entities/post.entity'
import { User } from '../../user/entities/user.entity'
import { Comment } from '../entities/comment.entity'

/**
 * The class that represents the service that deals with the comment
 * relations
 */
export class CommentRelationsService extends TypeOrmQueryService<Comment> {
  public constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {
    super(commentRepository)
  }

  /**
   * Method that searches for entities based on the parent
   *
   * @param commentId defines the entity id
   * @returns an object that represents the found entity
   */
  public async getOneUserByCommentId(commentId: string): Promise<User> {
    return await this.commentRepository
      .findOne(commentId, {
        relations: ['user'],
      })
      .then((comment) => comment.user)
  }

  /**
   * Method that searches for entities based on the parent
   *
   * @param commentId defines the entity id
   * @returns an object that represents the found entity
   */
  public async getOnePostByCommentId(commentId: string): Promise<Post> {
    return await this.commentRepository
      .findOne(commentId, {
        relations: ['post'],
      })
      .then((comment) => comment.post)
  }
}
