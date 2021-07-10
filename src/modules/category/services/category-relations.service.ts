import { ConnectionType } from '@nestjs-query/query-graphql'
import { Injectable, NotFoundException } from '@nestjs/common'

import { Category } from '../entities/category.entity'
import { Post } from 'src/modules/post/entities/post.entity'

import { QueryPostsArgs } from 'src/modules/post/dtos/query-posts.args'

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
      throw new NotFoundException(
        `The entity identified by '${categoryId}' of type '${Category.name}' was not found`,
      )
    }

    return await QueryPostsArgs.ConnectionType.createFromPromise(
      (query) =>
        this.categoryService.queryRelations(Post, 'posts', category, query),
      queryArgs,
    )
  }
}
