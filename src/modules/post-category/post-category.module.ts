import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { PostCategory } from './entities/post-category.entity'

import { PostCategoryService } from './services/post-category.service'

import { PostCategoryResolver } from './resolvers/post-category.resolver'

@Module({
  imports: [TypeOrmModule.forFeature([PostCategory])],
  providers: [PostCategoryResolver, PostCategoryService],
  exports: [PostCategoryService],
})
export class PostCategoryModule {}
