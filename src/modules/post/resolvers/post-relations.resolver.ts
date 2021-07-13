import { ConnectionType } from '@nestjs-query/query-graphql'
import { ParseUUIDPipe } from '@nestjs/common'
import { Args, Mutation, Parent, ResolveField, Resolver } from '@nestjs/graphql'

import { Post } from '../entities/post.entity'
import { Category } from 'src/modules/category/entities/category.entity'
import { User } from 'src/modules/user/entities/user.entity'

import { QueryCategoryArgs } from 'src/modules/category/dtos/query-category.args'

import { PostRelationsService } from '../services/post-relations.service'

/**
 * The class that represents te resolver that deals with the post relations
 */
@Resolver(() => Post)
export class PostRelationsResolver {
  public constructor(
    private readonly postRelationsService: PostRelationsService,
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
    parent: Post,
  ): Promise<User> {
    return await this.postRelationsService.getOneUserByUserId(parent.userId)
  }

  /**
   * Method that creates some relations
   *
   * @param postId defines the entity id
   * @param categoryIds defines an array of strings that represents several
   * entity ids
   * @returns an object that represents the entity that had their relations
   * modified
   */
  @Mutation(() => Post, {
    name: 'addCategories',
  })
  public async addCategories(
    @Args(
      'postId',
      {
        nullable: false,
      },
      ParseUUIDPipe,
    )
    postId: string,
    @Args('categoryIds', {
      nullable: false,
      type: () => [String],
    })
    categoryIds: string[],
  ): Promise<Post> {
    return await this.postRelationsService.addCategoriesByCategoryIds(
      postId,
      categoryIds,
    )
  }

  /**
   * Method that removes some relations
   *
   * @param postId defines the entity id
   * @param categoryIds defines an array of strings that represents several
   * entity ids
   * @returns an object that represents the entity that had their relations
   * modified
   */
  @Mutation(() => Post, {
    name: 'removeCategories',
  })
  public async removeCategories(
    @Args(
      'postId',
      {
        nullable: false,
      },
      ParseUUIDPipe,
    )
    postId: string,
    @Args('categoryIds', {
      nullable: false,
      type: () => [String],
    })
    categoryIds: string[],
  ): Promise<Post> {
    return await this.postRelationsService.removeCategoriesByCategoryIds(
      postId,
      categoryIds,
    )
  }

  /**
   * Method that searches for entities based on the sent query
   *
   * @param queryArgs defines the how the data will be returned
   * (paging, filtering and sorting)
   * @param parent defines an object that represents the parent of the
   * current sent query
   * @returns all the found entities paginated
   */
  @ResolveField(() => QueryCategoryArgs.ConnectionType, {
    name: 'categories',
  })
  public async getManyCategories(
    @Args()
    queryArgs: QueryCategoryArgs,
    @Parent()
    parent: Post,
  ): Promise<ConnectionType<Category>> {
    return await this.postRelationsService.getManyCategoriesByPostId(
      parent.id,
      queryArgs,
    )
  }
}
