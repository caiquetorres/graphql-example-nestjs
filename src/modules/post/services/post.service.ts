import { ConnectionType } from '@nestjs-query/query-graphql'
import { TypeOrmQueryService } from '@nestjs-query/query-typeorm'
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Post } from '../entities/post.entity'
import { User } from 'src/modules/user/entities/user.entity'

import { CreatePostInput } from '../dtos/create-post.input'
import { QueryPostsArgs } from '../dtos/query-posts.args'
import { UpdatePostInput } from '../dtos/update-post.input'

import { PermissionService } from 'src/modules/permission/services/permission.service'
import { UserService } from 'src/modules/user/services/user.service'

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
      throw new NotFoundException(
        `The entity identified by '${createPostInput.userId}' of type '${User.name}' was not found`,
      )
    }

    if (!this.permissionService.hasPermission(currentUser, user.id)) {
      throw new ForbiddenException(
        'You have not permission to access those sources',
      )
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
      throw new NotFoundException(
        `The entity identified by '${postId}' of type '${Post.name}' was not found`,
      )
    }

    return post
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
      throw new NotFoundException(
        `The entity identified by '${postId}' of type '${Post.name}' was not found`,
      )
    }

    if (!this.permissionService.hasPermission(currentUser, post.userId)) {
      throw new ForbiddenException(
        'You have not permission to access those sources',
      )
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
      throw new NotFoundException(
        `The entity identified by '${postId}' of type '${Post.name}' was not found`,
      )
    }

    if (!this.permissionService.hasPermission(currentUser, post.userId)) {
      throw new ForbiddenException(
        'You have not permission to access those sources',
      )
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
      throw new NotFoundException(
        `The entity identified by '${postId}' of type '${Post.name}' was not found`,
      )
    }

    if (!this.permissionService.hasPermission(currentUser, post.userId)) {
      throw new ForbiddenException(
        'You have not permission to access those sources',
      )
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
      throw new NotFoundException(
        `The entity identified by '${postId}' of type '${Post.name}' was not found`,
      )
    }

    if (!this.permissionService.hasPermission(currentUser, post.userId)) {
      throw new ForbiddenException(
        'You have not permission to access those sources',
      )
    }

    return await this.postRepository.save({
      ...post,
      active: true,
    })
  }
}
