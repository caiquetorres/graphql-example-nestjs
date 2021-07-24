import { Resolver } from '@nestjs/graphql'

import { Comment } from '../entities/comment.entity'

import { CommentRelationsService } from '../services/comment-relations.service'

@Resolver(() => Comment)
export class CommentRelationsResolver {
  public constructor(
    private readonly reviewRelationsService: CommentRelationsService,
  ) {}
}
