import { ConnectionType } from '@nestjs-query/query-graphql'
import { ParseUUIDPipe } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { ProtectTo } from 'src/decorators/protect-to/protect-to.decorator'

import { Category } from '../entities/category.entity'

import { CreateCategoryInput } from '../dtos/create-category.input'
import { QueryCategoryArgs } from '../dtos/query-category.args'
import { UpdateCategoryInput } from '../dtos/update-category.input'
import { RolesEnum } from 'src/models/enums/roles.enum'

import { CategoryService } from '../services/category.service'

/**
 * The class that represents the resolver that deals with the categories
 */
@Resolver(() => Category)
export class CategoryResolver {
  public constructor(private readonly categoryService: CategoryService) {}

  /**
   * Method that creates a new entity based on the sent payload
   *
   * @param createCategoryInput defines an object that has the entity data
   * @returns an object that represents the created entity
   */
  @ProtectTo(RolesEnum.Admin)
  @Mutation(() => Category, {
    name: 'createCategory',
  })
  public async insertOne(
    @Args('input', {
      type: () => CreateCategoryInput,
    })
    createCategoryInput: CreateCategoryInput,
  ): Promise<Category> {
    return await this.categoryService.insertOne(createCategoryInput)
  }

  /**
   * Method that searches for entities based on the sent query
   *
   * @param queryArgs defines the how the data will be returned
   * (paging, filtering and sorting)
   * @returns all the found entities paginated
   */
  @Query(() => QueryCategoryArgs.ConnectionType, {
    name: 'categories',
  })
  public async getMany(
    @Args()
    queryArgs: QueryCategoryArgs,
  ): Promise<ConnectionType<Category>> {
    return await this.categoryService.getMany(queryArgs)
  }

  /**
   * Method that searches one entity based on it id
   *
   * @param categoryId defines the entity id
   * @returns an object that represents the found entity
   */
  @Query(() => Category, {
    name: 'category',
  })
  public async getOne(
    @Args(
      'categoryId',
      {
        nullable: false,
      },
      ParseUUIDPipe,
    )
    categoryId: string,
  ): Promise<Category> {
    return await this.categoryService.getOne(categoryId)
  }

  /**
   * Method that updates some data of some entity
   *
   * @param categoryId defines the entity id
   * @param updateCategoryInput defines an object that has the new entity data
   */
  @ProtectTo(RolesEnum.Admin)
  @Mutation(() => Category, {
    name: 'updateCategory',
  })
  public async changeOne(
    @Args(
      'categoryId',
      {
        nullable: false,
      },
      ParseUUIDPipe,
    )
    categoryId: string,
    @Args('input', {
      type: () => UpdateCategoryInput,
    })
    updateCategoryInput: UpdateCategoryInput,
  ): Promise<Category> {
    return await this.categoryService.changeOne(categoryId, updateCategoryInput)
  }

  /**
   * Method that deletes some entity
   *
   * @param categoryId defines the entity id
   * @returns an object that represents the deleted entity
   */
  @ProtectTo(RolesEnum.Admin)
  @Mutation(() => Category, {
    name: 'deleteCategory',
  })
  public async removeOne(
    @Args(
      'categoryId',
      {
        nullable: false,
      },
      ParseUUIDPipe,
    )
    categoryId: string,
  ): Promise<Category> {
    return await this.categoryService.removeOne(categoryId)
  }

  /**
   * Method that disables some entity
   *
   * @param categoryId defines the entity id
   * @returns an object that represents the disabled entity
   */
  @ProtectTo(RolesEnum.Admin)
  @Mutation(() => Category, {
    name: 'disableCategory',
  })
  public async disableOne(
    @Args(
      'categoryId',
      {
        nullable: false,
      },
      ParseUUIDPipe,
    )
    categoryId: string,
  ): Promise<Category> {
    return await this.categoryService.disableOne(categoryId)
  }

  /**
   * Method that enables some entity
   *
   * @param categoryId defines the entity id
   * @returns an object that represents the enabled entity
   */
  @ProtectTo(RolesEnum.Admin)
  @Mutation(() => Category, {
    name: 'enableCategory',
  })
  public async enableOne(
    @Args(
      'categoryId',
      {
        nullable: false,
      },
      ParseUUIDPipe,
    )
    categoryId: string,
  ): Promise<Category> {
    return await this.categoryService.enableOne(categoryId)
  }
}
