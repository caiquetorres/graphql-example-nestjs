import { ConnectionType } from '@nestjs-query/query-graphql'
import { ParseUUIDPipe } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { CurrentUser } from '../../../decorators/current-user/current-user.decorator'
import { ProtectTo } from '../../../decorators/protect-to/protect-to.decorator'

import { User } from '../../user/entities/user.entity'
import { Post } from '../entities/post.entity'

import { RolesEnum } from '../../../models/enums/roles.enum'
import { CreatePostInput } from '../dtos/create-post.input'
import { QueryPostsArgs } from '../dtos/query-posts.args'
import { UpdatePostInput } from '../dtos/update-post.input'

import { PostService } from '../services/post.service'

/**
 * The class that represents te resolver that deals with the posts
 */
@Resolver(() => Post)
export class PostResolver {
  public constructor(private readonly postService: PostService) {}

  /**
   * Method that creates a new entity based on the sent payload
   *
   * @param createPostInput defines an object that has the entity data
   * @param currentUser defines an object that represents the
   * request user data
   * @returns an object that represents the created entity
   */
  @ProtectTo(RolesEnum.Common, RolesEnum.Admin)
  @Mutation(() => Post, {
    name: 'createPost',
  })
  public async insertOne(
    @Args('input', {
      type: () => CreatePostInput,
    })
    createPostInput: CreatePostInput,
    @CurrentUser()
    currentUser: User,
  ): Promise<Post> {
    return await this.postService.insertOne(createPostInput, currentUser)
  }

  /**
   * Method that searches for entities based on the sent query
   *
   * @param queryArgs defines the how the data will be returned
   * (paging, filtering and sorting)
   * @returns all the found entities paginated
   */
  @Query(() => QueryPostsArgs.ConnectionType, {
    name: 'posts',
  })
  public async getMany(
    @Args()
    queryArgs: QueryPostsArgs,
  ): Promise<ConnectionType<Post>> {
    return await this.postService.getMany(queryArgs)
  }

  /**
   * Method that searches one entity based on it id
   *
   * @param postId defines the entity id
   * @returns an object that represents the found entity
   */
  @Query(() => Post, {
    name: 'post',
  })
  public async getOne(
    @Args(
      'postId',
      {
        nullable: false,
      },
      ParseUUIDPipe,
    )
    postId: string,
  ): Promise<Post> {
    return await this.postService.getOne(postId)
  }

  /**
   * Method that updates some data of some entity
   *
   * @param postId defines the entity id
   * @param currentUser defines an object that represents the
   * request user data
   * @param updatePostInput defines an object that has the new entity data
   */
  @ProtectTo(RolesEnum.Admin, RolesEnum.Common)
  @Mutation(() => Post, {
    name: 'updatePost',
  })
  public async changeOne(
    @Args(
      'postId',
      {
        nullable: false,
      },
      ParseUUIDPipe,
    )
    postId: string,
    @Args('input', {
      type: () => UpdatePostInput,
    })
    updatePostInput: UpdatePostInput,
    @CurrentUser()
    currentUser: User,
  ): Promise<Post> {
    return await this.postService.changeOne(
      postId,
      updatePostInput,
      currentUser,
    )
  }

  /**
   * Method that deletes some entity
   *
   * @param postId defines the entity id
   * @param currentUser defines an object that represents the
   * request user data
   * @returns an object that represents the deleted entity
   */
  @ProtectTo(RolesEnum.Admin, RolesEnum.Common)
  @Mutation(() => Post, {
    name: 'deletePost',
  })
  public async removeOne(
    @Args(
      'postId',
      {
        nullable: false,
      },
      ParseUUIDPipe,
    )
    postId: string,
    @CurrentUser()
    currentUser: User,
  ): Promise<Post> {
    return await this.postService.removeOne(postId, currentUser)
  }

  /**
   * Method that disables some entity
   *
   * @param postId defines the entity id
   * @param currentUser defines an object that represents the
   * request user data
   * @returns an object that represents the disabled entity
   */
  @ProtectTo(RolesEnum.Common, RolesEnum.Admin)
  @Mutation(() => Post, {
    name: 'disablePost',
  })
  public async disableOne(
    @Args(
      'postId',
      {
        nullable: false,
      },
      ParseUUIDPipe,
    )
    postId: string,
    @CurrentUser()
    currentUser: User,
  ): Promise<Post> {
    return await this.postService.disableOne(postId, currentUser)
  }

  /**
   * Method that enables some entity
   *
   * @param postId defines the entity id
   * @param currentUser defines an object that represents the
   * request user data
   * @returns an object that represents the enabled entity
   */
  @ProtectTo(RolesEnum.Common, RolesEnum.Admin)
  @Mutation(() => Post, {
    name: 'enablePost',
  })
  public async enableOne(
    @Args(
      'postId',
      {
        nullable: false,
      },
      ParseUUIDPipe,
    )
    postId: string,
    @CurrentUser()
    currentUser: User,
  ): Promise<Post> {
    return await this.postService.enableOne(postId, currentUser)
  }
}
