import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Post } from './entities/post.entity'

import { PostService } from './services/post.service'

import { PermissionModule } from '../permission/permission.module'
import { UserModule } from '../user/user.module'
import { PostResolver } from './resolvers/post.resolver'

@Module({
  imports: [UserModule, PermissionModule, TypeOrmModule.forFeature([Post])],
  providers: [PostResolver, PostService],
})
export class PostModule {}
