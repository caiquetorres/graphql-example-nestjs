import { QueryArgsType } from '@nestjs-query/query-graphql'
import { ArgsType } from '@nestjs/graphql'

import { Category } from '../entities/category.entity'

@ArgsType()
export class QueryCategoryArgs extends QueryArgsType(Category) {}
