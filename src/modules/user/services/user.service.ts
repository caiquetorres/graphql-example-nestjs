import { ConnectionType } from '@nestjs-query/query-graphql'
import { TypeOrmQueryService } from '@nestjs-query/query-typeorm'
import { ConflictException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { EntityAlreadyDisabledException } from 'src/exceptions/entity-already-disabled/entity-already-disabled.exception'
import { EntityAlreadyEnabledException } from 'src/exceptions/entity-already-enabled/entity-already-enabled.exception'
import { EntityNotFoundException } from 'src/exceptions/entity-not-found/entity-not-found.exception'
import { ForbiddenException } from 'src/exceptions/forbidden/forbidden.exception'

import { User } from '../entities/user.entity'

import { CreateUserInput } from '../dtos/create-user.input'
import { QueryUsersArgs } from '../dtos/query-users.args'
import { UpdateUserInput } from '../dtos/update-user.input'
import { RolesEnum } from 'src/models/enums/roles.enum'

import { PasswordService } from 'src/modules/password/services/password.service'
import { PermissionService } from 'src/modules/permission/services/permission.service'

/**
 * The class that represents the service that deals with the users
 */
@Injectable()
export class UserService extends TypeOrmQueryService<User> {
  public constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly passwordService: PasswordService,
    private readonly permissionService: PermissionService,
  ) {
    super(userRepository)
  }

  /**
   * Method that creates a new entity based on the sent payload
   *
   * @param createUserInput defines an object that has the entity data
   * @returns an object that represents the created entity
   */
  public async insertOne(createUserInput: CreateUserInput): Promise<User> {
    const hasWithEmail = await this.getOneByEmail(createUserInput.email).then(
      (user) => !!user,
    )
    if (hasWithEmail) {
      throw new ConflictException(
        'An user with that e-mail has already been registered',
      )
    }

    const encryptedPassword = await this.passwordService.encryptPassword(
      createUserInput.password,
    )

    const user = this.userRepository.create({
      ...createUserInput,
      roles: RolesEnum.Common,
      password: encryptedPassword,
    })

    return await this.userRepository.save(user)
  }

  /**
   * Method that searches for entities based on the sent query
   *
   * @param queryArgs defines the how the data will be returned
   * (paging, filtering and sorting)
   * @returns all the found entities paginated
   */
  public async getMany(
    queryArgs: QueryUsersArgs,
  ): Promise<ConnectionType<User>> {
    return await QueryUsersArgs.ConnectionType.createFromPromise(
      (query) => this.query(query),
      queryArgs,
    )
  }

  /**
   * Method that searches one entity based on it id
   *
   * @param userId defines the entity id
   * @param currentUser defines an object that represents the
   * request user data
   * @returns an object that represents the found entity
   */
  public async getOne(userId: string, currentUser: User): Promise<User> {
    const user = await this.userRepository.findOne(userId)

    if (!user || !user.active) {
      throw new EntityNotFoundException(userId, User)
    }

    if (!this.permissionService.hasPermission(currentUser, userId)) {
      throw new ForbiddenException()
    }

    return user
  }

  /**
   * Method that finds some user based on the entity email
   *
   * @param email defines the user email
   * @returns an object that represents the user data
   */
  public async getOneByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({ where: { email } })
  }

  /**
   * Method that finds an entity based on it id
   *
   * @param userId defines the entity id
   * @returns an object that represents the found entity or undefined
   */
  public async findOneById(userId: string): Promise<User> {
    return await this.userRepository.findOne(userId)
  }

  /**
   * Method that updates some data of some entity
   *
   * @param userId defines the entity id
   * @param updateUserInput defines an object that has the new entity data
   * @param currentUser defines an object that represents the
   * request user data
   * @returns an object that represents the updated entity
   */
  public async changeOne(
    userId: string,
    updateUserInput: UpdateUserInput,
    currentUser: User,
  ): Promise<User> {
    const user = await this.userRepository.findOne(userId)

    if (!user || !user.active) {
      throw new EntityNotFoundException(userId, User)
    }

    if (!this.permissionService.hasPermission(currentUser, userId)) {
      throw new ForbiddenException()
    }

    return await this.userRepository.save({
      ...user,
      ...updateUserInput,
    })
  }

  /**
   * Method that deletes some entity
   *
   * @param userId defines the entity id
   * @param currentUser defines an object that represents the
   * request user data
   * @returns an object that represents the deleted entity
   */
  public async removeOne(userId: string, currentUser: User): Promise<User> {
    const user = await this.userRepository.findOne(userId)

    if (!user || !user.active) {
      throw new EntityNotFoundException(userId, User)
    }

    if (!this.permissionService.hasPermission(currentUser, userId)) {
      throw new ForbiddenException()
    }

    await this.userRepository.delete(userId)
    return user
  }

  /**
   * Method that disables some entity
   *
   * @param userId defines the entity id
   * @param currentUser defines an object that represents the
   * request user data
   * @returns an object that represents the disabled entity
   */
  public async disableOne(userId: string, currentUser: User): Promise<User> {
    const user = await this.userRepository.findOne(userId)

    if (!user) {
      throw new EntityNotFoundException(userId, User)
    }

    if (!user.active) {
      throw new EntityAlreadyDisabledException(userId, User)
    }

    if (!this.permissionService.hasPermission(currentUser, userId)) {
      throw new ForbiddenException()
    }

    return await this.userRepository.save({
      ...user,
      active: false,
    })
  }

  /**
   * Method that enables some entity
   *
   * @param userId defines the entity id
   * @param currentUser defines an object that represents the
   * request user data
   * @returns an object that represents the enabled entity
   */
  public async enableOne(userId: string, currentUser: User): Promise<User> {
    const user = await this.userRepository.findOne(userId)

    if (!user) {
      throw new EntityNotFoundException(userId, User)
    }

    if (user.active) {
      throw new EntityAlreadyEnabledException(userId, User)
    }

    if (!this.permissionService.hasPermission(currentUser, userId)) {
      throw new ForbiddenException()
    }

    return await this.userRepository.save({
      ...user,
      active: true,
    })
  }
}
