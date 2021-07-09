import { forwardRef, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Post } from './entities/post.entity'

import { PostRelationsService } from './services/post-relations.service'
import { PostService } from './services/post.service'

import { PermissionModule } from '../permission/permission.module'
import { UserModule } from '../user/user.module'
import { PostRelationsResolver } from './resolvers/post-relations.resolver'
import { PostResolver } from './resolvers/post.resolver'

@Module({
  imports: [
    PermissionModule,
    forwardRef(() => UserModule),
    TypeOrmModule.forFeature([Post]),
  ],
  providers: [
    PostResolver,
    PostService,
    PostRelationsResolver,
    PostRelationsService,
  ],
  exports: [PostService],
})
export class PostModule {}
