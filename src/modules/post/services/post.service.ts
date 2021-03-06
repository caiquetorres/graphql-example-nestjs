import { ConnectionType } from '@nestjs-query/query-graphql'
import { TypeOrmQueryService } from '@nestjs-query/query-typeorm'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { EntityAlreadyDisabledException } from '../../../exceptions/entity-already-disabled/entity-already-disabled.exception'
import { EntityAlreadyEnabledException } from '../../../exceptions/entity-already-enabled/entity-already-enabled.exception'
import { EntityNotFoundException } from '../../../exceptions/entity-not-found/entity-not-found.exception'
import { ForbiddenException } from '../../../exceptions/forbidden/forbidden.exception'

import { User } from '../../user/entities/user.entity'
import { Post } from '../entities/post.entity'

import { CreatePostInput } from '../dtos/create-post.input'
import { QueryPostsArgs } from '../dtos/query-posts.args'
import { UpdatePostInput } from '../dtos/update-post.input'

import { PermissionService } from '../../permission/services/permission.service'
import { UserService } from '../../user/services/user.service'

/**
 * The class that represents the service that deals with the posts
 */
@Injectable()
export class PostService extends TypeOrmQueryService<Post> {
  public constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    private readonly permissionService: PermissionService,
    private readonly userService: UserService,
  ) {
    super(postRepository)
  }

  /**
   * Method that creates a new entity based on the sent payload
   *
   * @param createPostInput defines an object that has the entity data
   * @param currentUser defines an object that represents the
   * request user data
   * @returns an object that represents the created entity
   */
  public async insertOne(
    createPostInput: CreatePostInput,
    currentUser: User,
  ): Promise<Post> {
    const user = await this.userService.findOneById(createPostInput.userId)

    if (!user || !user.active) {
      throw new EntityNotFoundException(user.id, User)
    }

    if (!this.permissionService.hasPermission(currentUser, user.id)) {
      throw new ForbiddenException()
    }

    const post = this.postRepository.create({
      ...createPostInput,
      user,
    })

    return await this.postRepository.save(post)
  }

  /**
   * Method that searches for entities based on the sent query
   *
   * @param queryArgs defines the how the data will be returned
   * (paging, filtering and sorting)
   * @returns all the found entities paginated
   */
  public async getMany(
    queryArgs: QueryPostsArgs,
  ): Promise<ConnectionType<Post>> {
    return await QueryPostsArgs.ConnectionType.createFromPromise(
      (query) => this.query(query),
      queryArgs,
    )
  }

  /**
   * Method that searches one entity based on it id
   *
   * @param postId defines the entity id
   * @returns an object that represents the found entity
   */
  public async getOne(postId: string): Promise<Post> {
    const post = await this.postRepository.findOne(postId)

    if (!post || !post.active) {
      throw new EntityNotFoundException(postId, Post)
    }

    return post
  }

  /**
   * Method that finds an entity based on it idks
   *
   * @param postId defines the entity id
   * @returns an object that represents the found entity or undefined
   */
  public async findOneById(postId: string): Promise<Post> {
    return await this.postRepository.findOne(postId)
  }

  /**
   * Method that updates some data of some entity
   *
   * @param postId defines the entity id
   * @param updateUserInput defines an object that has the new entity data
   * @param currentUser defines an object that represents the request
   * user data
   */
  public async changeOne(
    postId: string,
    updateUserInput: UpdatePostInput,
    currentUser: User,
  ): Promise<Post> {
    const post = await this.postRepository.findOne(postId)

    if (!post || !post.active) {
      throw new EntityNotFoundException(postId, Post)
    }

    if (!this.permissionService.hasPermission(currentUser, post.userId)) {
      throw new ForbiddenException()
    }

    return await this.postRepository.save({
      ...post,
      ...updateUserInput,
    })
  }

  /**
   * Method that deletes some entity
   *
   * @param postId defines the entity id
   * @param currentUser defines an object that represents the request
   * user data
   * @returns an object that represents the deleted entity
   */
  public async removeOne(postId: string, currentUser: User): Promise<Post> {
    const post = await this.postRepository.findOne(postId)

    if (!post || !post.active) {
      throw new EntityNotFoundException(postId, Post)
    }

    if (!this.permissionService.hasPermission(currentUser, post.userId)) {
      throw new ForbiddenException()
    }

    await this.postRepository.delete(postId)
    return post
  }

  /**
   * Method that disables some entity
   *
   * @param postId defines the entity id
   * @param currentUser defines an object that represents the request
   * user data
   * @returns an object that represents the disabled entity
   */
  public async disableOne(postId: string, currentUser: User): Promise<Post> {
    const post = await this.postRepository.findOne(postId)

    if (!post) {
      throw new EntityNotFoundException(postId, Post)
    }

    if (!post.active) {
      throw new EntityAlreadyDisabledException(postId, Post)
    }

    if (!this.permissionService.hasPermission(currentUser, post.userId)) {
      throw new ForbiddenException()
    }

    return await this.postRepository.save({
      ...post,
      active: false,
    })
  }

  /**
   * Method that enables some entity
   *
   * @param postId defines the entity id
   * @param currentUser defines an object that represents the request
   * user data
   * @returns an object that represents the enabled entity
   */
  public async enableOne(postId: string, currentUser: User): Promise<Post> {
    const post = await this.postRepository.findOne(postId)

    if (!post) {
      throw new EntityNotFoundException(postId, Post)
    }

    if (post.active) {
      throw new EntityAlreadyEnabledException(postId, Post)
    }

    if (!this.permissionService.hasPermission(currentUser, post.userId)) {
      throw new ForbiddenException()
    }

    return await this.postRepository.save({
      ...post,
      active: true,
    })
  }
}
