import { ConnectionType } from '@nestjs-query/query-graphql'
import { ParseUUIDPipe } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { ProtectTo } from 'src/decorators/protect-to/protect-to.decorator'

import { PostCategory } from '../entities/post-category.entity'

import { CreatePostCategoryInput } from '../dtos/create-post-category.input'
import { QueryPostsCategoryArgs } from '../dtos/query-post-category.args'
import { UpdatePostCategoryInput } from '../dtos/update-post-category.input'
import { RolesEnum } from 'src/models/enums/roles.enum'

import { PostCategoryService } from '../services/post-category.service'

/**
 * The class that represents the resolver that deals with the post-categories
 */
@Resolver(() => PostCategory)
export class PostCategoryResolver {
  public constructor(
    private readonly postCategoryService: PostCategoryService,
  ) {}

  /**
   * Method that creates a new entity based on the sent payload
   *
   * @param createPostCategoryInput defines an object that has the entity data
   * @returns an object that represents the created entity
   */
  @Mutation(() => PostCategory, {
    name: 'createPostCategory',
  })
  public async insertOne(
    @Args('input', {
      type: () => CreatePostCategoryInput,
    })
    createPostCategoryInput: CreatePostCategoryInput,
  ): Promise<PostCategory> {
    return await this.postCategoryService.insertOne(createPostCategoryInput)
  }

  /**
   * Method that creates several new entities based on the sent payloads
   *
   * @param createPostCategoryInputs defines an array with objects that have the
   * entities data
   * @returns an array with objects that represent the created entities
   */
  @Mutation(() => PostCategory, {
    name: 'createPostCategory',
  })
  public async insertMany(
    @Args('input', {
      type: () => [CreatePostCategoryInput],
    })
    createPostCategoryInputs: CreatePostCategoryInput[],
  ): Promise<PostCategory[]> {
    return await this.postCategoryService.insertMany(createPostCategoryInputs)
  }

  /**
   * Method that searches for entities based on the sent query
   *
   * @param queryArgs defines the how the data will be returned
   * (paging, filtering and sorting)
   * @returns all the found entities paginated
   */
  @ProtectTo(RolesEnum.Admin)
  @Query(() => QueryPostsCategoryArgs.ConnectionType, {
    name: 'postCategories',
  })
  public async getMany(
    @Args()
    queryArgs: QueryPostsCategoryArgs,
  ): Promise<ConnectionType<PostCategory>> {
    return await this.postCategoryService.getMany(queryArgs)
  }

  /**
   * Method that searches one entity based on it id
   *
   * @param postCategoryId defines the entity id
   * @returns an object that represents the found entity
   */
  @ProtectTo(RolesEnum.Admin)
  @Query(() => PostCategory, {
    name: 'postCategory',
  })
  public async getOne(
    @Args(
      'postCategoryId',
      {
        nullable: false,
      },
      ParseUUIDPipe,
    )
    postCategoryId: string,
  ): Promise<PostCategory> {
    return await this.postCategoryService.getOne(postCategoryId)
  }

  /**
   * Method that updates some data of some entity
   *
   * @param postCategoryId defines the entity id
   * @param updateUserInput defines an object that has the new entity data
   */
  @ProtectTo(RolesEnum.Admin)
  @Mutation(() => PostCategory, {
    name: 'updatePostCategory',
  })
  public async changeOne(
    @Args(
      'postCategoryId',
      {
        nullable: false,
      },
      ParseUUIDPipe,
    )
    postCategoryId: string,
    @Args('input', {
      type: () => UpdatePostCategoryInput,
    })
    updatePostCategoryInput: UpdatePostCategoryInput,
  ): Promise<PostCategory> {
    return await this.postCategoryService.changeOne(
      postCategoryId,
      updatePostCategoryInput,
    )
  }

  /**
   * Method that deletes some entity
   *
   * @param postCategoryId defines the entity id
   * @returns an object that represents the deleted entity
   */
  @ProtectTo(RolesEnum.Admin)
  @Mutation(() => PostCategory, {
    name: 'deletePostCategory',
  })
  public async removeOne(
    @Args(
      'postCategoryId',
      {
        nullable: false,
      },
      ParseUUIDPipe,
    )
    postCategoryId: string,
  ): Promise<PostCategory> {
    return await this.postCategoryService.removeOne(postCategoryId)
  }

  /**
   * Method that disables some entity
   *
   * @param postCategoryId defines the entity id
   * @returns an object that represents the disabled entity
   */
  @ProtectTo(RolesEnum.Admin)
  @Mutation(() => PostCategory, {
    name: 'disablePostCategoryId',
  })
  public async disableOne(
    @Args(
      'disablePostCategoryId',
      {
        nullable: false,
      },
      ParseUUIDPipe,
    )
    postCategoryId: string,
  ): Promise<PostCategory> {
    return await this.postCategoryService.disableOne(postCategoryId)
  }

  /**
   * Method that enables some entity
   *
   * @param postCategoryId defines the entity id
   * @returns an object that represents the enabled entity
   */
  @ProtectTo(RolesEnum.Admin)
  @Mutation(() => PostCategory, {
    name: 'enableUser',
  })
  public async enableOne(
    @Args(
      'postCategoryId',
      {
        nullable: false,
      },
      ParseUUIDPipe,
    )
    postCategoryId: string,
  ): Promise<PostCategory> {
    return await this.postCategoryService.enableOne(postCategoryId)
  }
}
