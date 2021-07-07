import { ConnectionType } from '@nestjs-query/query-graphql'
import { ParseUUIDPipe } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { CurrentUser } from 'src/decorators/current-user/current-user.decorator'
import { ProtectTo } from 'src/decorators/protect-to/protect-to.decorator'

import { User } from '../entities/user.entity'

import { CreateUserInput } from '../dtos/create-user.input'
import { UserQueryArgs } from '../dtos/user-query.args'
import { RolesEnum } from 'src/models/enums/roles.enum'

import { UserService } from '../services/user.service'

/**
 * The class that represents the resolver that deals with the user
 */
@Resolver(() => User)
export class UserResolver {
  public constructor(private readonly userService: UserService) {}

  /**
   * Method that creates a new entity based on the sent payload
   *
   * @param createUserInput defines an object that has the entity data
   * @returns an object that represents the created entity
   */
  @Mutation(() => User)
  public async createOneUser(
    @Args('input', { type: () => CreateUserInput })
    createUserInput: CreateUserInput,
  ): Promise<User> {
    return await this.userService.createOne(createUserInput)
  }

  /**
   * Method that searches for entities based on the sent query
   *
   * @param currentUser defines an object that represents the
   * request user data
   * @param queryArgs defines the how the data will be returned
   * (paging, filtering and sorting)
   * @returns all the found elements paginated
   */
  @ProtectTo(RolesEnum.Admin)
  @Query(() => UserQueryArgs.ConnectionType)
  public async getManyUsers(
    @Args() queryArgs: UserQueryArgs,
  ): Promise<ConnectionType<User>> {
    return await this.userService.getMany(queryArgs)
  }

  /**
   * Method that searches one entity based on it id
   *
   * @param currentUser defines an object that represents the
   * request user data
   * @param userId defines the entity id
   * @returns an object that represents the found entity
   */
  @ProtectTo(RolesEnum.Admin, RolesEnum.Common)
  @Query(() => User)
  public async getOneUser(
    @CurrentUser() currentUser: User,
    @Args(
      'userId',
      {
        nullable: true,
      },
      ParseUUIDPipe,
    )
    userId: string,
  ): Promise<User> {
    return await this.userService.getOne(currentUser, userId)
  }
}
