import { ConnectionType } from '@nestjs-query/query-graphql'
import { TypeOrmQueryService } from '@nestjs-query/query-typeorm'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { EntityNotFoundException } from 'src/exceptions/entity-not-found/entity-not-found.exception'

import { Post } from '../entities/post.entity'
import { Category } from 'src/modules/category/entities/category.entity'
import { User } from 'src/modules/user/entities/user.entity'

import { QueryCategoryArgs } from 'src/modules/category/dtos/query-category.args'

import { CategoryService } from 'src/modules/category/services/category.service'

/**
 * The class that represents the service that deals with the post relations
 */
@Injectable()
export class PostRelationsService extends TypeOrmQueryService<Post> {
  public constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    private readonly categoryService: CategoryService,
  ) {
    super(postRepository)
  }

  /**
   * Method that searches for entities based on the parent
   *
   * @param postId defines the entity id
   * @returns an object that represents the found entity
   */
  public async getOneUserByPostId(postId: string): Promise<User> {
    return await this.postRepository
      .findOne(postId, {
        relations: ['user'],
      })
      .then((post) => post.user)
  }

  /**
   * Method that searches for entities based on the sent query
   *
   * @param postId defines the entity id
   * @param queryArgs defines the how the data will be returned
   * (paging, filtering and sorting)
   * @returns all the found entities paginated
   */
  public async getManyCategoriesByPostId(
    postId: string,
    queryArgs: QueryCategoryArgs,
  ): Promise<ConnectionType<Category>> {
    const post = await this.postRepository.findOne(postId)

    return await QueryCategoryArgs.ConnectionType.createFromPromise(
      (query) => this.queryRelations(Category, 'categories', post, query),
      queryArgs,
    )
  }

  /**
   * Method that searches for entities based on the sent query
   *
   * @param postId defines the entity id
   * @param categoryIds defines an array with entity ids
   * @returns all the found entities paginated
   */
  public async addCategoryByCategoryIdAndPostId(
    postId: string,
    categoryIds: string[],
  ): Promise<Category[]> {
    const post = await this.postRepository.findOne(postId, {
      relations: ['categories'],
    })

    if (!post || !post.active) {
      throw new EntityNotFoundException(postId, Post)
    }

    const categories = await this.categoryService.findManyByIds(categoryIds)

    post.categories.push(...categories)
    await this.postRepository.save(post)

    return categories
  }

  /**
   * Method that searches for entities based on the sent query
   *
   * @param postId defines the entity id
   * @param categoryIds defines an array with entity ids
   * @returns all the found entities paginated
   */
  public async removeCategoryByCategoryIdAndPostId(
    postId: string,
    categoryIds: string[],
  ): Promise<Category[]> {
    const post = await this.postRepository.findOne(postId, {
      relations: ['categories'],
    })

    if (!post || !post.active) {
      throw new EntityNotFoundException(postId, Post)
    }

    const categories = await this.categoryService.findManyByIds(categoryIds)

    post.categories = post.categories.filter(
      (category) => !categories.some((c) => c.id === category.id),
    )
    await this.postRepository.save(post)

    return categories
  }
}
