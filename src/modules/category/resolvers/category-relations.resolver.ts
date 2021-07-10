import { Resolver } from '@nestjs/graphql'

import { Category } from '../entities/category.entity'

import { CategoryRelationsService } from '../services/category-relations.service'

@Resolver(() => Category)
export class CategoryRelationsResolver {
  public constructor(
    private readonly categoryRelationsService: CategoryRelationsService,
  ) {}
}
