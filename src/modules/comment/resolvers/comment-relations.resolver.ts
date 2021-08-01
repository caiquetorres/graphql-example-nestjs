import { ResolveField, Parent, Resolver } from '@nestjs/graphql'

import { Post } from '../../post/entities/post.entity'
import { User } from '../../user/entities/user.entity'
import { Comment } from '../entities/comment.entity'

import { CommentRelationsService } from '../services/comment-relations.service'

/**
 * The class that represents te resolver that deals with the post relations
 */
@Resolver(() => Comment)
export class CommentRelationsResolver {
  public constructor(
    private readonly commentRelationsService: CommentRelationsService,
  ) {}

  /**
   * Method that searches for entities based on the parent
   *
   * @param parent defines an object that represents the parent of the
   * current sent query
   * @returns an object that represents the found entity
   */
  @ResolveField(() => User, {
    name: 'user',
  })
  public async getOneUser(
    @Parent()
    parent: Comment,
  ): Promise<User> {
    return await this.commentRelationsService.getOneUserByCommentId(parent.id)
  }

  /**
   * Method that searches for entities based on the parent
   *
   * @param parent defines an object that represents the parent of the
   * current sent query
   * @returns an object that represents the found entity
   */
  @ResolveField(() => Post, {
    name: 'post',
  })
  public async getOnePost(
    @Parent()
    parent: Comment,
  ): Promise<Post> {
    return await this.commentRelationsService.getOnePostByCommentId(parent.id)
  }
}
