import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Comment } from './entities/comment.entity'

import { CommentRelationsService } from './services/comment-relations.service'
import { CommentService } from './services/comment.service'

import { PermissionModule } from '../permission/permission.module'
import { PostModule } from '../post/post.module'
import { UserModule } from '../user/user.module'
import { CommentRelationsResolver } from './resolvers/comment-relations.resolver'
import { CommentResolver } from './resolvers/comment.resolver'

@Module({
  imports: [
    UserModule,
    PostModule,
    PermissionModule,
    TypeOrmModule.forFeature([Comment]),
  ],
  providers: [
    CommentService,
    CommentResolver,
    CommentRelationsService,
    CommentRelationsResolver,
  ],
  exports: [CommentService],
})
export class CommentModule {}
