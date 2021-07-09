import { QueryArgsType } from '@nestjs-query/query-graphql'
import { ArgsType } from '@nestjs/graphql'

import { User } from '../entities/user.entity'

/**
 * The class that represents the arguments sent to the api for
 * fetching users
 */
@ArgsType()
export class UserQueryArgs extends QueryArgsType(User) {}
