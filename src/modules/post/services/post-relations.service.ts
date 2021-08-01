import { ConnectionType } from '@nestjs-query/query-graphql'
import { TypeOrmQueryService } from '@nestjs-query/query-typeorm'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { EntityNotFoundException } from '../../../exceptions/entity-not-found/entity-not-found.exception'

import { Category } from '../../category/entities/category.entity'
import { Comment } from '../../comment/entities/comment.entity'
import { User } from '../../user/entities/user.entity'
import { Post } from '../entities/post.entity'

import { QueryCategoryArgs } from '../../category/dtos/query-category.args'
import { QueryCommentsArgs } from '../../comment/dtos/query-comments.args'

import { CategoryService } from '../../category/services/category.service'

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
   * @param queryArgs defines the how the data will be returned
   * (paging, filtering and sorting)
   * @returns all the found entities paginated
   */
  public async getManyCommentsByPostId(
    postId: string,
    queryArgs: QueryCommentsArgs,
  ): Promise<ConnectionType<Comment>> {
    const post = await this.postRepository.findOne(postId)

    return await QueryCommentsArgs.ConnectionType.createFromPromise(
      (query) => this.queryRelations(Comment, 'comments', post, query),
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
