import { ConnectionType } from '@nestjs-query/query-graphql'
import { ParseUUIDPipe } from '@nestjs/common'
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql'

import { CurrentUser } from 'src/decorators/current-user/current-user.decorator'
import { ProtectTo } from 'src/decorators/protect-to/protect-to.decorator'

import { Comment } from '../entities/comment.entity'
import { User } from 'src/modules/user/entities/user.entity'

import { CreateCommentInput } from '../dtos/create-comment.input'
import { QueryCommentsArgs } from '../dtos/query-comments.args'
import { UpdateCommentInput } from '../dtos/update-comment.input'
import { RolesEnum } from 'src/models/enums/roles.enum'

import { CommentService } from '../services/comment.service'

/**
 * The class that represents the resolver that deals with the comments
 */
@Resolver(() => Comment)
export class CommentResolver {
  public constructor(private readonly commentService: CommentService) {}

  /**
   * Method that creates a new entity based on the sent payload
   *
   * @param createCommentInput defines an object that has the entity data
   * @param currentUser defines an object that represents the
   * request user data
   * @returns an object that represents the created entity
   */
  @ProtectTo(RolesEnum.Common, RolesEnum.Admin)
  @Mutation(() => Comment, {
    name: 'createComment',
  })
  public async insertOne(
    @Args('input', {
      type: () => CreateCommentInput,
    })
    createCommentInput: CreateCommentInput,
    @CurrentUser()
    currentUser: User,
  ): Promise<Comment> {
    return await this.commentService.insertOne(createCommentInput, currentUser)
  }

  /**
   * Method that searches for entities based on the sent query
   *
   * @param queryArgs defines the how the data will be returned
   * (paging, filtering and sorting)
   * @returns all the found entities paginated
   */
  @Query(() => QueryCommentsArgs.ConnectionType, {
    name: 'comments',
  })
  public async getMany(
    @Args()
    queryArgs: QueryCommentsArgs,
  ): Promise<ConnectionType<Comment>> {
    return await this.commentService.getMany(queryArgs)
  }

  /**
   * Method that searches one entity based on it id
   *
   * @param commentId defines the entity id
   * @returns an object that represents the found entity
   */
  @Query(() => Comment, {
    name: 'comment',
  })
  public async getOne(
    @Args(
      'commentId',
      {
        nullable: false,
      },
      ParseUUIDPipe,
    )
    commentId: string,
  ): Promise<Comment> {
    return await this.commentService.getOne(commentId)
  }

  /**
   * Method that updates some data of some entity
   *
   * @param commentId defines the entity id
   * @param updateCommentInput defines an object that has the new entity data
   * @param currentUser defines an object that represents the
   * request user data
   */
  @ProtectTo(RolesEnum.Common, RolesEnum.Admin)
  @Mutation(() => Comment, {
    name: 'updatedComment',
  })
  public async changeOne(
    @Args(
      'commentId',
      {
        nullable: false,
      },
      ParseUUIDPipe,
    )
    commentId: string,
    @Args('input', {
      type: () => UpdateCommentInput,
    })
    updateCommentInput: UpdateCommentInput,
    @CurrentUser()
    currentUser: User,
  ): Promise<Comment> {
    return await this.commentService.changeOne(
      commentId,
      updateCommentInput,
      currentUser,
    )
  }

  /**
   * Method that deletes some entity
   *
   * @param commentId defines the entity id
   * @param currentUser defines an object that represents the
   * request user data
   * @returns an object that represents the deleted entity
   */
  @ProtectTo(RolesEnum.Common, RolesEnum.Admin)
  @Mutation(() => Comment, {
    name: 'deleteComment',
  })
  public async removeOne(
    @Args(
      'commentId',
      {
        nullable: false,
      },
      ParseUUIDPipe,
    )
    commentId: string,
    @CurrentUser()
    currentUser: User,
  ): Promise<Comment> {
    return await this.commentService.removeOne(commentId, currentUser)
  }

  /**
   * Method that disables some entity
   *
   * @param commentId defines the entity id
   * @param currentUser defines an object that represents the
   * request user data
   * @returns an object that represents the disabled entity
   */
  @ProtectTo(RolesEnum.Admin)
  @Mutation(() => Comment, {
    name: 'disableComment',
  })
  public async disableOne(
    @Args(
      'commentId',
      {
        nullable: false,
      },
      ParseUUIDPipe,
    )
    commentId: string,
    @CurrentUser()
    currentUser: User,
  ): Promise<Comment> {
    return await this.commentService.disableOne(commentId, currentUser)
  }

  /**
   * Method that enables some entity
   *
   * @param commentId defines the entity id
   * @param currentUser defines an object that represents the
   * request user data
   * @returns an object that represents the enabled entity
   */
  @ProtectTo(RolesEnum.Admin)
  @Mutation(() => Comment, {
    name: 'enableComment',
  })
  public async enableOne(
    @Args(
      'commentId',
      {
        nullable: false,
      },
      ParseUUIDPipe,
    )
    commentId: string,
    @CurrentUser()
    currentUser: User,
  ): Promise<Comment> {
    return await this.commentService.enableOne(commentId, currentUser)
  }
}
