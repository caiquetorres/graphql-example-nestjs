import { ConnectionType } from '@nestjs-query/query-graphql'
import { Args, Query, Resolver } from '@nestjs/graphql'

import { User } from '../entities/user.entity'

import { UserQueryArgs } from '../dtos/user-query.args'

import { UserService } from '../services/user.service'

/**
 * The class that represents the resolver that deals with the user
 */
@Resolver(() => User)
export class UserResolver {
  public constructor(private readonly userService: UserService) {}

  /**
   * Method that searches for user entities based on the sent query
   *
   * @param queryArgs defines the how the data will be returned
   * (paging, filtering and sorting)
   * @returns all the found elements paginated
   */
  @Query(() => UserQueryArgs.ConnectionType)
  public async getMany(
    @Args()
    queryArgs: UserQueryArgs,
  ): Promise<ConnectionType<User>> {
    return await UserQueryArgs.ConnectionType.createFromPromise(
      (query) => this.userService.query(query),
      queryArgs,
    )
  }
}
