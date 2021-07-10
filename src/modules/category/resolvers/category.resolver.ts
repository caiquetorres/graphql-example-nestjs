import { Resolver } from '@nestjs/graphql'

import { Category } from '../entities/category.entity'

import { CategoryService } from '../services/category.service'

@Resolver(() => Category)
export class CategoryResolver {
  public constructor(private readonly categoryService: CategoryService) {}
}
