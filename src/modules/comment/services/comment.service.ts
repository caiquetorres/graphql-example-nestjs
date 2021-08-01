import { ConnectionType } from '@nestjs-query/query-graphql'
import { TypeOrmQueryService } from '@nestjs-query/query-typeorm'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { EntityAlreadyDisabledException } from '../../../exceptions/entity-already-disabled/entity-already-disabled.exception'
import { EntityAlreadyEnabledException } from '../../../exceptions/entity-already-enabled/entity-already-enabled.exception'
import { EntityNotFoundException } from '../../../exceptions/entity-not-found/entity-not-found.exception'
import { ForbiddenException } from '../../../exceptions/forbidden/forbidden.exception'

import { Post } from '../../post/entities/post.entity'
import { User } from '../../user/entities/user.entity'
import { Comment } from '../entities/comment.entity'

import { CreateCommentInput } from '../dtos/create-comment.input'
import { QueryCommentsArgs } from '../dtos/query-comments.args'
import { UpdateCommentInput } from '../dtos/update-comment.input'

import { PermissionService } from '../../permission/services/permission.service'
import { PostService } from '../../post/services/post.service'
import { UserService } from '../../user/services/user.service'

/**
 * The class that represents the service that deals with the reviews
 */
@Injectable()
export class CommentService extends TypeOrmQueryService<Comment> {
  public constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    private readonly userService: UserService,
    private readonly postService: PostService,
    private readonly permissionService: PermissionService,
  ) {
    super(commentRepository)
  }

  /**
   * Method that creates a new entity based on the sent payload
   *
   * @param createCommentInput defines an object that has the entity data
   * @param currentUser defines an object that represents the
   * request user data
   * @returns an object that represents the created entity
   */
  public async insertOne(
    createCommentInput: CreateCommentInput,
    currentUser: User,
  ): Promise<Comment> {
    const { userId, postId } = createCommentInput

    const user = await this.userService.findOneById(userId)
    if (!user || !user.active) {
      throw new EntityNotFoundException(userId, User)
    }

    if (!this.permissionService.hasPermission(currentUser, userId)) {
      throw new ForbiddenException()
    }

    const post = await this.postService.findOneById(postId)
    if (!post || !post.active) {
      throw new EntityNotFoundException(postId, Post)
    }

    const comment = this.commentRepository.create({
      ...createCommentInput,
      user,
      post,
    })

    return await this.commentRepository.save(comment)
  }

  /**
   * Method that searches for entities based on the sent query
   *
   * @param queryArgs defines the how the data will be returned
   * (paging, filtering and sorting)
   * @returns all the found entities paginated
   */
  public async getMany(
    queryArgs: QueryCommentsArgs,
  ): Promise<ConnectionType<Comment>> {
    return await QueryCommentsArgs.ConnectionType.createFromPromise(
      (query) => this.query(query),
      queryArgs,
    )
  }

  /**
   * Method that searches one entity based on it id
   *
   * @param commentId defines the entity id
   * @param currentUser defines an object that represents the
   * request user data
   * @returns an object that represents the found entity
   */
  public async getOne(commentId: string): Promise<Comment> {
    const comment = await this.commentRepository.findOne(commentId)

    if (!comment || !comment.active) {
      throw new EntityNotFoundException(commentId, Comment)
    }

    return comment
  }

  /**
   * Method that updates some data of some entity
   *
   * @param commentId defines the entity id
   * @param updateCommentInput defines an object that has the new entity data
   * @param currentUser defines an object that represents the
   * request user data
   * @returns an object that represents the updated entity
   */
  public async changeOne(
    commentId: string,
    updateCommentInput: UpdateCommentInput,
    currentUser: User,
  ): Promise<Comment> {
    const comment = await this.commentRepository.findOne(commentId)

    if (!comment || !comment.active) {
      throw new EntityNotFoundException(commentId, Comment)
    }

    if (!this.permissionService.hasPermission(currentUser, commentId)) {
      throw new ForbiddenException()
    }

    return await this.commentRepository.save({
      ...comment,
      ...updateCommentInput,
    })
  }

  /**
   * Method that deletes some entity
   *
   * @param commentId defines the entity id
   * @param currentUser defines an object that represents the
   * request user data
   * @returns an object that represents the deleted entity
   */
  public async removeOne(
    commentId: string,
    currentUser: User,
  ): Promise<Comment> {
    const commment = await this.commentRepository.findOne(commentId)

    if (!commment || !commment.active) {
      throw new EntityNotFoundException(commentId, Comment)
    }

    if (!this.permissionService.hasPermission(currentUser, commentId)) {
      throw new ForbiddenException()
    }

    await this.commentRepository.delete(commentId)

    return commment
  }

  /**
   * Method that disables some entity
   *
   * @param commentId defines the entity id
   * @param currentUser defines an object that represents the
   * request user data
   * @returns an object that represents the disabled entity
   */
  public async disableOne(
    commentId: string,
    currentUser: User,
  ): Promise<Comment> {
    const comment = await this.commentRepository.findOne(commentId)

    if (!comment) {
      throw new EntityNotFoundException(commentId, Comment)
    }

    if (!comment.active) {
      throw new EntityAlreadyDisabledException(commentId, Comment)
    }

    if (!this.permissionService.hasPermission(currentUser, commentId)) {
      throw new ForbiddenException()
    }

    return await this.commentRepository.save({
      ...comment,
      active: false,
    })
  }

  /**
   * Method that enables some entity
   *
   * @param commentId defines the entity id
   * @param currentUser defines an object that represents the
   * request user data
   * @returns an object that represents the enabled entity
   */
  public async enableOne(
    commentId: string,
    currentUser: User,
  ): Promise<Comment> {
    const comment = await this.commentRepository.findOne(commentId)

    if (!comment) {
      throw new EntityNotFoundException(commentId, Comment)
    }

    if (comment.active) {
      throw new EntityAlreadyEnabledException(commentId, Comment)
    }

    if (!this.permissionService.hasPermission(currentUser, commentId)) {
      throw new ForbiddenException()
    }

    return await this.commentRepository.save({
      ...comment,
      active: true,
    })
  }
}
