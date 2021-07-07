import { ConnectionType } from '@nestjs-query/query-graphql'
import { createCursorQueryArgsType } from '@nestjs-query/query-graphql/dist/src/types/query/query-args'
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
import { UserQueryArgs } from '../dtos/user-query.args'
import { RolesEnum } from 'src/models/enums/roles.enum'

import { PasswordService } from 'src/modules/password/services/password.service'

/**
 * The class that represents the service that deals with the user
 */
@Injectable()
export class UserService extends TypeOrmQueryService<User> {
  public constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly passwordService: PasswordService,
  ) {
    super(userRepository)
  }

  /**
   * Method that creates a new entity based on the sent payload
   *
   * @param createUserInput defines an object that has the entity data
   * @returns an object that represents the created entity
   */
  public async createOne(createUserInput: CreateUserInput): Promise<User> {
    const hasWithEmail = !!(await this.getOneByEmail(createUserInput.email))
    if (hasWithEmail) {
      throw new ConflictException(
        'An user with that e-mail has already been registered',
      )
    }

    const encryptedPassword = await this.passwordService.encryptPassword(
      createUserInput.password,
    )

    const entity = this.userRepository.create({
      ...createUserInput,
      roles: RolesEnum.Common,
      password: encryptedPassword,
    })

    return await this.userRepository.save(entity)
  }

  /**
   * Method that searches for entities based on the sent query
   *
   * @param currentUser defines an object that represents the
   * @param queryArgs defines the how the data will be returned
   * (paging, filtering and sorting)
   * @returns all the found elements paginated
   */
  public async getMany(
    queryArgs: UserQueryArgs,
  ): Promise<ConnectionType<User>> {
    return await createCursorQueryArgsType(
      User,
    ).ConnectionType.createFromPromise((query) => this.query(query), queryArgs)
  }

  /**
   * Method that searches one entity based on it id
   *
   * request user data
   * @param userId defines the entity id
   * @returns an object that represents the found entity
   */
  public async getOne(currentUser: User, userId: string): Promise<User> {
    if (currentUser.id !== userId && !currentUser.roles.includes('admin')) {
      throw new ForbiddenException(
        'You have not permission to access those sources',
      )
    }

    const entity = await this.userRepository.findOne(userId)

    if (!entity) {
      throw new NotFoundException(
        `The entity identified by '${userId}' of type '${User.name}' was not found`,
      )
    }

    return entity
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
}
