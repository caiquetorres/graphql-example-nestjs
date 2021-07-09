import { ConnectionType } from '@nestjs-query/query-graphql'
import { TypeOrmQueryService } from '@nestjs-query/query-typeorm'
import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { User } from '../entities/user.entity'

import { CreateUserInput } from '../dtos/create-user.input'
import { UpdateUserInput } from '../dtos/update-user.input'
import { UserQueryArgs } from '../dtos/user-query.args'
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
   * @returns all the found elements paginated
   */
  public async getMany(
    queryArgs: UserQueryArgs,
  ): Promise<ConnectionType<User>> {
    return await UserQueryArgs.ConnectionType.createFromPromise(
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
      throw new NotFoundException(
        `The entity identified by '${userId}' of type '${User.name}' was not found`,
      )
    }

    if (!this.permissionService.hasPermission(currentUser, userId)) {
      throw new ForbiddenException(
        'You have not permission to access those sources',
      )
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
   * Method that updates some data of some entity
   *
   * @param userId defines the entity id
   * @param updateUserInput defines an object that has the new entity data
   * @param currentUser defines an object that represents the
   * request user data
   */
  public async changeOne(
    userId: string,
    updateUserInput: UpdateUserInput,
    currentUser: User,
  ): Promise<User> {
    const user = await this.userRepository.findOne(userId)

    if (!user || !user.active) {
      throw new NotFoundException(
        `The entity identified by '${userId}' of type '${User.name}' was not found`,
      )
    }

    if (!this.permissionService.hasPermission(currentUser, userId)) {
      throw new ForbiddenException(
        'You have not permission to access those sources',
      )
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
      throw new NotFoundException(
        `The entity identified by '${userId}' of type '${User.name}' was not found`,
      )
    }

    if (!this.permissionService.hasPermission(currentUser, userId)) {
      throw new ForbiddenException(
        'You have not permission to access those sources',
      )
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
      throw new NotFoundException(
        `The entity identified by '${userId}' of type '${User.name}' was not found`,
      )
    }

    if (!this.permissionService.hasPermission(currentUser, userId)) {
      throw new ForbiddenException(
        'You have not permission to access those sources',
      )
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
      throw new NotFoundException(
        `The entity identified by '${userId}' of type '${User.name}' was not found`,
      )
    }

    if (!this.permissionService.hasPermission(currentUser, userId)) {
      throw new ForbiddenException(
        'You have not permission to access those sources',
      )
    }

    return await this.userRepository.save({
      ...user,
      active: true,
    })
  }
}
