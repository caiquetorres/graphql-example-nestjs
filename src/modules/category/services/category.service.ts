import { TypeOrmQueryService } from '@nestjs-query/query-typeorm'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Category } from '../entities/category.entity'

@Injectable()
export class CategoryService extends TypeOrmQueryService<Category> {
  public constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {
    super(categoryRepository)
  }
}
