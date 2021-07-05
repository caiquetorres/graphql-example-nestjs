import { Resolver } from '@nestjs/graphql'

import { User } from '../entities/user.entity'

/**
 * The class that represents the resolver that deals with the user
 */
@Resolver(() => User)
export class UserResolver {}
