import { ConnectionType } from '@nestjs-query/query-graphql'
import { TypeOrmQueryService } from '@nestjs-query/query-typeorm'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { EntityAlreadyDisabledException } from 'src/exceptions/entity-already-disabled/entity-already-disabled.exception'
import { EntityAlreadyEnabledException } from 'src/exceptions/entity-already-enabled/entity-already-enabled.exception'
import { EntityNotFoundException } from 'src/exceptions/entity-not-found/entity-not-found.exception'

import { PostCategory } from '../entities/post-category.entity'

import { CreatePostCategoryInput } from '../dtos/create-post-category.input'
import { QueryPostsCategoryArgs } from '../dtos/query-post-category.args'
import { UpdatePostCategoryInput } from '../dtos/update-post-category.input'

@Injectable()
export class PostCategoryService extends TypeOrmQueryService<PostCategory> {
  public constructor(
    @InjectRepository(PostCategory)
    private readonly postCategoryRepository: Repository<PostCategory>,
  ) {
    super(postCategoryRepository)
  }

  /**
   * Method that creates a new entity based on the sent payload
   *
   * @param createPostCategoryInput defines an object that has the entity data
   * @returns an object that represents the created entity
   */
  public async insertOne(
    createPostCategoryInput: CreatePostCategoryInput,
  ): Promise<PostCategory> {
    const entity = this.postCategoryRepository.create(createPostCategoryInput)

    return await this.postCategoryRepository.save(entity)
  }

  /**
   * Method that creates several new entities based on the sent payloads
   *
   * @param createPostCategoryInputs defines an array with objects that have the
   * entities data
   * @returns an array with objects that represent the created entities
   */
  public async insertMany(
    createPostCategoryInputs: CreatePostCategoryInput[],
  ): Promise<PostCategory[]> {
    const entities = this.postCategoryRepository.create(
      createPostCategoryInputs,
    )

    return await this.postCategoryRepository.save(entities)
  }

  /**
   * Method that searches for entities based on the sent query
   *
   * @param queryArgs defines the how the data will be returned
   * (paging, filtering and sorting)
   * @returns all the found entities paginated
   */
  public async getMany(
    queryArgs: QueryPostsCategoryArgs,
  ): Promise<ConnectionType<PostCategory>> {
    return await QueryPostsCategoryArgs.ConnectionType.createFromPromise(
      (query) => this.query(query),
      queryArgs,
    )
  }

  /**
   * Method that searches one entity based on it id
   *
   * @param postCategoryId defines the entity id
   * @param currentUser defines an object that represents the
   * request user data
   * @returns an object that represents the found entity
   */
  public async getOne(postCategoryId: string): Promise<PostCategory> {
    const postCategory = await this.postCategoryRepository.findOne(
      postCategoryId,
    )

    if (!postCategory || !postCategory.active) {
      throw new EntityNotFoundException(postCategoryId, PostCategory)
    }

    return postCategory
  }

  /**
   * Method that updates some data of some entity
   *
   * @param postCategoryId defines the entity id
   * @param updatePostCategoryInput defines an object that has the new entity data
   * @returns an object that represents the updated entity
   */
  public async changeOne(
    postCategoryId: string,
    updatePostCategoryInput: UpdatePostCategoryInput,
  ): Promise<PostCategory> {
    const postCategory = await this.postCategoryRepository.findOne(
      postCategoryId,
    )

    if (!postCategory || !postCategory.active) {
      throw new EntityNotFoundException(postCategoryId, PostCategory)
    }

    return await this.postCategoryRepository.save({
      ...postCategory,
      ...updatePostCategoryInput,
    })
  }

  /**
   * Method that deletes some entity
   *
   * @param postCategoryId defines the entity id
   * @returns an object that represents the deleted entity
   */
  public async removeOne(postCategoryId: string): Promise<PostCategory> {
    const postCategory = await this.postCategoryRepository.findOne(
      postCategoryId,
    )

    if (!postCategory || !postCategory.active) {
      throw new EntityNotFoundException(postCategoryId, PostCategory)
    }

    await this.postCategoryRepository.delete(postCategoryId)
    return postCategory
  }

  /**
   * Method that disables some entity
   *
   * @param postCategoryId defines the entity id
   * @returns an object that represents the disabled entity
   */
  public async disableOne(postCategoryId: string): Promise<PostCategory> {
    const postCategory = await this.postCategoryRepository.findOne(
      postCategoryId,
    )

    if (!postCategory) {
      throw new EntityNotFoundException(postCategoryId, PostCategory)
    }

    if (!postCategory.active) {
      throw new EntityAlreadyDisabledException(postCategoryId, PostCategory)
    }

    return await this.postCategoryRepository.save({
      ...postCategory,
      active: false,
    })
  }

  /**
   * Method that enables some entity
   *
   * @param postCategoryId defines the entity id
   * @returns an object that represents the enabled entity
   */
  public async enableOne(postCategoryId: string): Promise<PostCategory> {
    const postCategory = await this.postCategoryRepository.findOne(
      postCategoryId,
    )

    if (!postCategory) {
      throw new EntityNotFoundException(postCategoryId, PostCategory)
    }

    if (postCategory.active) {
      throw new EntityAlreadyEnabledException(postCategoryId, PostCategory)
    }

    return await this.postCategoryRepository.save({
      ...postCategory,
      active: true,
    })
  }
}
