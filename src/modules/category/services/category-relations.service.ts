import { ConnectionType } from '@nestjs-query/query-graphql'
import { Injectable } from '@nestjs/common'

import { EntityNotFoundException } from '../../../exceptions/entity-not-found/entity-not-found.exception'

import { Post } from '../../post/entities/post.entity'
import { Category } from '../entities/category.entity'

import { QueryPostsArgs } from '../../post/dtos/query-posts.args'

import { CategoryService } from './category.service'

/**
 * The class that represents the service that deals with the category
 * relations
 */
@Injectable()
export class CategoryRelationsService {
  public constructor(private readonly categoryService: CategoryService) {}

  /**
   * Method that searches for entities based on the sent query
   *
   * @param categoryId defines the entity id
   * @param queryArgs defines the how the data will be returned
   * (paging, filtering and sorting)
   * @returns all the found entities paginated
   */
  public async getManyPostsByCategoryId(
    categoryId: string,
    queryArgs: QueryPostsArgs,
  ): Promise<ConnectionType<Post>> {
    const category = await this.categoryService.findOneById(categoryId)

    if (!category || !category.active) {
      throw new EntityNotFoundException(categoryId, Category)
    }

    return await QueryPostsArgs.ConnectionType.createFromPromise(
      (query) =>
        this.categoryService.queryRelations(Post, 'posts', category, query),
      queryArgs,
    )
  }
}
