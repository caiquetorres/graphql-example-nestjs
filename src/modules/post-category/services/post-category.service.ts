import { TypeOrmQueryService } from '@nestjs-query/query-typeorm'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { PostCategory } from '../entities/post-category.entity'

@Injectable()
export class PostCategoryService extends TypeOrmQueryService<PostCategory> {
  public constructor(
    @InjectRepository(PostCategory)
    private readonly postCategoryRepository: Repository<PostCategory>,
  ) {
    super(postCategoryRepository)
  }
}
