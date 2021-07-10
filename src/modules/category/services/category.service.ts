import { ConnectionType } from '@nestjs-query/query-graphql'
import { TypeOrmQueryService } from '@nestjs-query/query-typeorm'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { EntityAlreadyDisabledException } from 'src/exceptions/entity-already-disabled/entity-already-disabled.exception'
import { EntityAlreadyEnabledException } from 'src/exceptions/entity-already-enabled/entity-already-enabled.exception'
import { EntityNotFoundException } from 'src/exceptions/entity-not-found/entity-not-found.exception'

import { Category } from '../entities/category.entity'

import { CreateCategoryInput } from '../dtos/create-category.input'
import { QueryCategoryArgs } from '../dtos/query-category.args'
import { UpdateCategoryInput } from '../dtos/update-category.input'

/**
 * The class that represents the service that deals with the categories
 */
@Injectable()
export class CategoryService extends TypeOrmQueryService<Category> {
  public constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {
    super(categoryRepository)
  }

  /**
   * Method that creates a new entity based on the sent payload
   *
   * @param createCategoryInput defines an object that has the entity data
   * @returns an object that represents the created entity
   */
  public async insertOne(
    createCategoryInput: CreateCategoryInput,
  ): Promise<Category> {
    const category = this.categoryRepository.create(createCategoryInput)
    return await this.categoryRepository.save(category)
  }

  /**
   * Method that searches for entities based on the sent query
   *
   * @param queryArgs defines the how the data will be returned
   * (paging, filtering and sorting)
   * @returns all the found entities paginated
   */
  public async getMany(
    queryArgs: QueryCategoryArgs,
  ): Promise<ConnectionType<Category>> {
    return await QueryCategoryArgs.ConnectionType.createFromPromise(
      (query) => this.query(query),
      queryArgs,
    )
  }

  /**
   * Method that searches one entity based on it id
   *
   * @param categoryId defines the entity id
   * @returns an object that represents the found entity
   */
  public async getOne(categoryId: string): Promise<Category> {
    const category = await this.categoryRepository.findOne(categoryId)

    if (!category || !category.active) {
      throw new EntityNotFoundException(categoryId, Category)
    }

    return category
  }

  /**
   * Method that finds an entity based on it id
   *
   * @param categoryId defines the entity id
   * @returns an object that represents the found entity or undefined
   */
  public async findOneById(categoryId: string): Promise<Category> {
    return await this.categoryRepository.findOne(categoryId)
  }

  /**
   * Method that updates some data of some entity
   *
   * @param categoryId defines the entity id
   * @param updateUserInput defines an object that has the new entity data
   */
  public async changeOne(
    categoryId: string,
    updateUserInput: UpdateCategoryInput,
  ): Promise<Category> {
    const category = await this.categoryRepository.findOne(categoryId)

    if (!category || !category.active) {
      throw new EntityNotFoundException(categoryId, Category)
    }

    return await this.categoryRepository.save({
      ...category,
      ...updateUserInput,
    })
  }

  /**
   * Method that deletes some entity
   *
   * @param categoryId defines the entity id
   * @returns an object that represents the deleted entity
   */
  public async removeOne(categoryId: string): Promise<Category> {
    const category = await this.categoryRepository.findOne(categoryId)

    if (!category || !category.active) {
      throw new EntityNotFoundException(categoryId, Category)
    }

    await this.categoryRepository.delete(categoryId)
    return category
  }

  /**
   * Method that disables some entity
   *
   * @param categoryId defines the entity id
   * @returns an object that represents the disabled entity
   */
  public async disableOne(categoryId: string): Promise<Category> {
    const category = await this.categoryRepository.findOne(categoryId)

    if (!category) {
      throw new EntityNotFoundException(categoryId, Category)
    }

    if (!category.active) {
      throw new EntityAlreadyDisabledException(categoryId, Category)
    }

    return await this.categoryRepository.save({
      ...category,
      active: false,
    })
  }

  /**
   * Method that enables some entity
   *
   * @param categoryId defines the entity id
   * @returns an object that represents the enabled entity
   */
  public async enableOne(categoryId: string): Promise<Category> {
    const category = await this.categoryRepository.findOne(categoryId)

    if (!category) {
      throw new EntityNotFoundException(categoryId, Category)
    }

    if (category.active) {
      throw new EntityAlreadyEnabledException(categoryId, Category)
    }

    return await this.categoryRepository.save({
      ...category,
      active: true,
    })
  }
}
