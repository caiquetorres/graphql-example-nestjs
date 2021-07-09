import { Parent, ResolveField, Resolver } from '@nestjs/graphql'

import { Post } from '../entities/post.entity'
import { User } from 'src/modules/user/entities/user.entity'

import { PostRelationsService } from '../services/post-relations.service'

/**
 * The class that represents te resolver that deals with the post relations
 */
@Resolver(() => Post)
export class PostRelationsResolver {
  public constructor(
    private readonly postRelationsService: PostRelationsService,
  ) {}

  /**
   * Method that searches for entities based on the parent
   *
   * @param parent defines an object that represents the parent of the
   * current sent query
   * @returns an object that represents the found entity
   */
  @ResolveField(() => User, {
    name: 'user',
  })
  public async getOneUser(
    @Parent()
    parent: Post,
  ): Promise<User> {
    return await this.postRelationsService.getOneUser(parent.userId)
  }
}
