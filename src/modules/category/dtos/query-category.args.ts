import { QueryArgsType } from '@nestjs-query/query-graphql'
import { ArgsType } from '@nestjs/graphql'

import { Category } from '../entities/category.entity'

/**
 * The class that represents the arguments sent to the api for
 * fetching categories
 */
@ArgsType()
export class QueryCategoryArgs extends QueryArgsType(Category) {}
