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
 * The class that represents the resolver that deals with the users
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
  public async insertOne(
    @Args('input', {
      type: () => CreateUserInput,
    })
    createUserInput: CreateUserInput,
  ): Promise<User> {
    return await this.userService.insertOne(createUserInput)
  }

  /**
   * Method that searches for entities based on the sent query
   *
   * @param queryArgs defines the how the data will be returned
   * (paging, filtering and sorting)
   * @returns all the found entities paginated
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
   * @param userId defines the entity id
   * @param currentUser defines an object that represents the
   * request user data
   * @returns an object that represents the found entity
   */
  @ProtectTo(RolesEnum.Admin, RolesEnum.Common)
  @Query(() => User, {
    name: 'user',
  })
  public async getOne(
    @Args(
      'userId',
      {
        nullable: true,
      },
      ParseUUIDPipe,
    )
    userId: string,
    @CurrentUser()
    currentUser: User,
  ): Promise<User> {
    return await this.userService.getOne(userId, currentUser)
  }

  /**
   * Method that searches one entity based on it id
   *
   * @param currentUser defines an object that represents the
   * request user data
   * @returns an object that represents the found entity
   */
  @ProtectTo(RolesEnum.Admin, RolesEnum.Common)
  @Query(() => User, {
    name: 'me',
  })
  public async getMe(
    @CurrentUser()
    currentUser: User,
  ): Promise<User> {
    return await this.userService.getOne(currentUser.id, currentUser)
  }

  /**
   * Method that updates some data of some entity
   *
   * @param userId defines the entity id
   * @param currentUser defines an object that represents the
   * request user data
   * @param updateUserInput defines an object that has the new entity data
   */
  @ProtectTo(RolesEnum.Admin, RolesEnum.Common)
  @Mutation(() => User, {
    name: 'updateUser',
  })
  public async changeOne(
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
    @CurrentUser()
    currentUser: User,
  ): Promise<User> {
    return await this.userService.changeOne(
      userId,
      updateUserInput,
      currentUser,
    )
  }

  /**
   * Method that deletes some entity
   *
   * @param userId defines the entity id
   * @param currentUser defines an object that represents the
   * request user data
   * @returns an object that represents the deleted entity
   */
  @ProtectTo(RolesEnum.Admin, RolesEnum.Common)
  @Mutation(() => User, {
    name: 'deleteUser',
  })
  public async removeOne(
    @Args(
      'userId',
      {
        nullable: true,
      },
      ParseUUIDPipe,
    )
    userId: string,
    @CurrentUser()
    currentUser: User,
  ): Promise<User> {
    return await this.userService.removeOne(userId, currentUser)
  }

  /**
   * Method that disables some entity
   *
   * @param userId defines the entity id
   * @param currentUser defines an object that represents the
   * request user data
   * @returns an object that represents the disabled entity
   */
  @ProtectTo(RolesEnum.Admin)
  @Mutation(() => User, {
    name: 'disableUser',
  })
  public async disableOne(
    @Args(
      'userId',
      {
        nullable: true,
      },
      ParseUUIDPipe,
    )
    userId: string,
    @CurrentUser()
    currentUser: User,
  ): Promise<User> {
    return await this.userService.disableOne(userId, currentUser)
  }

  /**
   * Method that enables some entity
   *
   * @param userId defines the entity id
   * @param currentUser defines an object that represents the
   * request user data
   * @returns an object that represents the enabled entity
   */
  @ProtectTo(RolesEnum.Admin)
  @Mutation(() => User, {
    name: 'enableUser',
  })
  public async enableOne(
    @Args(
      'userId',
      {
        nullable: true,
      },
      ParseUUIDPipe,
    )
    userId: string,
    @CurrentUser()
    currentUser: User,
  ): Promise<User> {
    return await this.userService.enableOne(userId, currentUser)
  }
}
