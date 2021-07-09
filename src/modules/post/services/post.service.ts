import { TypeOrmQueryService } from '@nestjs-query/query-typeorm'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Post } from '../entities/post.entity'

/**
 * The class that represents the service that deals with the posts
 */
@Injectable()
export class PostService extends TypeOrmQueryService<Post> {
  public constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {
    super(postRepository)
  }
}
