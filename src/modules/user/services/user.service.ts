import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { User } from '../entities/user.entity'

/**
 * The class that represents the service that deals with the user
 */
@Injectable()
export class UserService {
  public constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  /**
   * Method that finds some user based on the entity id
   *
   * @param userId defines the user id
   * @returns an object that represents the user data
   */
  public async getOneById(userId: string): Promise<User> {
    return await this.userRepository.findOne(userId)
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
