import { ConnectionType } from '@nestjs-query/query-graphql'
import { ParseUUIDPipe } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { CurrentUser } from 'src/decorators/current-user/current-user.decorator'
import { ProtectTo } from 'src/decorators/protect-to/protect-to.decorator'

import { User } from '../entities/user.entity'

import { CreateUserInput } from '../dtos/create-user.input'
import { UpdateUserInput } from '../dtos/update-user.input'
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
  @Mutation(() => User, {
    name: 'createUser',
  })
  public async createOne(
    @Args('input', {
      type: () => CreateUserInput,
    })
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
  @Query(() => UserQueryArgs.ConnectionType, {
    name: 'users',
  })
  public async getMany(
    @Args()
    queryArgs: UserQueryArgs,
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
  @Query(() => User, {
    name: 'user',
  })
  public async getOne(
    @CurrentUser()
    currentUser: User,
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

  /**
   * Method that updates some data of some entity
   *
   * @param currentUser defines an object that represents the
   * request user data
   * @param userId defines the entity id
   * @param updateUserInput defines an object that has the new entity data
   */
  @ProtectTo(RolesEnum.Admin, RolesEnum.Common)
  @Mutation(() => User, {
    name: 'updateUser',
  })
  public async changeOne(
    @CurrentUser()
    currentUser: User,
    @Args(
      'userId',
      {
        nullable: true,
      },
      ParseUUIDPipe,
    )
    userId: string,
    @Args('input', {
      type: () => UpdateUserInput,
    })
    updateUserInput: UpdateUserInput,
  ): Promise<User> {
    return await this.userService.changeOne(
      currentUser,
      userId,
      updateUserInput,
    )
  }

  /**
   * Method that deletes some entity
   *
   * @param currentUser defines an object that represents the
   * request user data
   * @param userId defines the entity id
   * @returns an object that represents the deleted entity
   */
  @ProtectTo(RolesEnum.Admin, RolesEnum.Common)
  @Mutation(() => User, {
    name: 'deleteUser',
  })
  public async removeOne(
    @CurrentUser()
    currentUser: User,
    @Args(
      'userId',
      {
        nullable: true,
      },
      ParseUUIDPipe,
    )
    userId: string,
  ): Promise<User> {
    return await this.userService.removeOne(currentUser, userId)
  }

  /**
   * Method that disables some entity
   *
   * @param currentUser defines an object that represents the
   * request user data
   * @param userId defines the entity id
   * @returns an object that represents the disabled entity
   */
  @ProtectTo(RolesEnum.Admin)
  @Mutation(() => User, {
    name: 'disableUser',
  })
  public async disableOne(
    @CurrentUser()
    currentUser: User,
    @Args(
      'userId',
      {
        nullable: true,
      },
      ParseUUIDPipe,
    )
    userId: string,
  ): Promise<User> {
    return await this.userService.disableOne(currentUser, userId)
  }

  /**
   * Method that enables some entity
   *
   * @param currentUser defines an object that represents the
   * request user data
   * @param userId defines the entity id
   * @returns an object that represents the enabled entity
   */
  @ProtectTo(RolesEnum.Admin)
  @Mutation(() => User, {
    name: 'enableUser',
  })
  public async enableOne(
    @CurrentUser()
    currentUser: User,
    @Args(
      'userId',
      {
        nullable: true,
      },
      ParseUUIDPipe,
    )
    userId: string,
  ): Promise<User> {
    return await this.userService.enableOne(currentUser, userId)
  }
}
