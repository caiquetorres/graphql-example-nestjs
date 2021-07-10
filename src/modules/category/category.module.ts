import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Category } from './entities/category.entity'

import { CategoryRelationsService } from './services/category-relations.service'
import { CategoryService } from './services/category.service'

import { CategoryRelationsResolver } from './resolvers/category-relations.resolver'
import { CategoryResolver } from './resolvers/category.resolver'

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  providers: [
    CategoryResolver,
    CategoryService,
    CategoryRelationsResolver,
    CategoryRelationsService,
  ],
  exports: [CategoryService],
})
export class CategoryModule {}
