import { Parent, ResolveField, Resolver } from '@nestjs/graphql'

import { Comment } from '../entities/comment.entity'
import { Post } from 'src/modules/post/entities/post.entity'
import { User } from 'src/modules/user/entities/user.entity'

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
    return await this.commentRelationsService.getUserByCommentId(parent.id)
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
    return await this.commentRelationsService.getPostByCommentId(parent.id)
  }
}
