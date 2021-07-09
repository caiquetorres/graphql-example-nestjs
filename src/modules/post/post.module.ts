import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Post } from './entities/post.entity'

import { PostService } from './services/post.service'

import { PostResolver } from './resolvers/post.resolver'

@Module({
  imports: [TypeOrmModule.forFeature([Post])],
  providers: [PostResolver, PostService],
})
export class PostModule {}
