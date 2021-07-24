import { TypeOrmQueryService } from '@nestjs-query/query-typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Comment } from '../entities/comment.entity'

export class CommentRelationsService extends TypeOrmQueryService<Comment> {
  public constructor(
    @InjectRepository(Comment)
    public readonly reviewRepository: Repository<Comment>,
  ) {
    super(reviewRepository)
  }
}
