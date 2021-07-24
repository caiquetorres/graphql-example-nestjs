import { Resolver } from '@nestjs/graphql'

import { Comment } from '../entities/comment.entity'

import { CommentService } from '../services/comment.service'

@Resolver(() => Comment)
export class CommentResolver {
  public constructor(private readonly reviewService: CommentService) {}
}
