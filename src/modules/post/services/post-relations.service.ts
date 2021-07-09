import { Injectable } from '@nestjs/common'

import { User } from 'src/modules/user/entities/user.entity'

import { UserService } from 'src/modules/user/services/user.service'

/**
 * The class that represents the service that deals with the post relations
 */
@Injectable()
export class PostRelationsService {
  public constructor(private readonly userService: UserService) {}

  /**
   * Method that searches for entities based on the parent
   *
   * @param userId defines the entity id
   * @returns an object that represents the found entity
   */
  public async getOneUserByUserId(userId: string): Promise<User> {
    return await this.userService.findOneById(userId)
  }
}
