import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { TypeOrmModule } from '@nestjs/typeorm'

import { GraphQLService } from './modules/graphql/graphql.service'
import { TypeOrmService } from './modules/typeorm/typeorm.service'

import { AuthModule } from './modules/auth/auth.module'
import { EnvModule } from './modules/env/env.module'
import { PasswordModule } from './modules/password/password.module'
import { PermissionModule } from './modules/permission/permission.module'
import { PostModule } from './modules/post/post.module'
import { UserModule } from './modules/user/user.module'

@Module({
  imports: [
    PasswordModule,
    PermissionModule,
    AuthModule,
    UserModule,
    PostModule,
    EnvModule.forRoot({
      envFilePath: ['.env'],
    }),
    GraphQLModule.forRootAsync({
      useClass: GraphQLService,
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmService,
    }),
  ],
  controllers: [],
})
export class AppModule {}
