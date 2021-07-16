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
import { UserService } from 'src/modules/user/services/user.service'

/**
 * The class that represents the service that deals with the post relations
 */
@Injectable()
export class PostRelationsService extends TypeOrmQueryService<Post> {
  public constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    private readonly userService: UserService,
    private readonly categoryService: CategoryService,
  ) {
    super(postRepository)
  }

  /**
   * Method that searches for entities based on the parent
   *
   * @param userId defines the entity id
   * @returns an object that represents the found entity
   */
  public async getOneUserByUserId(userId: string): Promise<User> {
    return await this.userService.findOneById(userId)
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
  public async addCategoriesByCategoryIds(
    postId: string,
    categoryIds: string[],
  ): Promise<Post> {
    // TODO: This method needs to be optmized

    const categories = await this.categoryService.findByIds(categoryIds)

    const post = await this.postRepository.findOne(postId, {
      relations: ['categories'],
    })

    if (!post || !post.active) {
      throw new EntityNotFoundException(postId, Post)
    }

    // post.categories.push(...categories)

    return await this.postRepository.save(post)
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
  public async removeCategoriesByCategoryIds(
    postId: string,
    categoryIds: string[],
  ): Promise<Post> {
    // TODO: This method needs to be optmized

    const categories = await this.categoryService.findByIds(categoryIds)

    const post = await this.postRepository.findOne(postId, {
      relations: ['categories'],
    })

    if (!post || !post.active) {
      throw new EntityNotFoundException(postId, Post)
    }

    // post.categories = post.categories.filter((category) =>
    //   categories.every((c) => c.id !== category.id),
    // )

    return await this.postRepository.save(post)
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

    if (!post || !post.active) {
      throw new EntityNotFoundException(postId, Post)
    }

    return await QueryCategoryArgs.ConnectionType.createFromPromise(
      (query) => this.queryRelations(Category, 'categories', post, query),
      queryArgs,
    )
  }
}
