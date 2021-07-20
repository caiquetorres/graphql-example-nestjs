import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { PostCategory } from './entities/post-category.entity'

import { PostCategoryService } from './services/post-category.service'

import { CategoryModule } from '../category/category.module'
import { PostModule } from '../post/post.module'
import { PostCategoryResolver } from './resolvers/post-category.resolver'

@Module({
  imports: [
    CategoryModule,
    PostModule,
    TypeOrmModule.forFeature([PostCategory]),
  ],
  providers: [PostCategoryResolver, PostCategoryService],
  exports: [PostCategoryService],
})
export class PostCategoryModule {}
