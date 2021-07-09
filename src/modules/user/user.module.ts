import { forwardRef, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { User } from './entities/user.entity'

import { UserRelationsService } from './services/user-relations.service'
import { UserService } from './services/user.service'

import { PasswordModule } from '../password/password.module'
import { PermissionModule } from '../permission/permission.module'
import { PostModule } from '../post/post.module'
import { UserRelationsResolver } from './resolvers/user-relations.resolver'
import { UserResolver } from './resolvers/user.resolver'

@Module({
  imports: [
    PasswordModule,
    PermissionModule,
    forwardRef(() => PostModule),
    TypeOrmModule.forFeature([User]),
  ],
  providers: [
    UserService,
    UserResolver,
    UserRelationsService,
    UserRelationsResolver,
  ],
  exports: [UserService],
})
export class UserModule {}
