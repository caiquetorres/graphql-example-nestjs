import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Post } from './entities/post.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Post])],
})
export class PostModule {}
