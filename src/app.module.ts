import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { TypeOrmModule } from '@nestjs/typeorm'

import { GraphQLService } from './modules/graphql/graphql.service'
import { I18nConfigService } from './modules/i18n-config/i18n-config.service'
import { TypeOrmService } from './modules/typeorm/typeorm.service'

import { AuthModule } from './modules/auth/auth.module'
import { CategoryModule } from './modules/category/category.module'
import { EnvModule } from './modules/env/env.module'
import { PasswordModule } from './modules/password/password.module'
import { PermissionModule } from './modules/permission/permission.module'
import { PostModule } from './modules/post/post.module'
import { UserModule } from './modules/user/user.module'
import { I18nJsonParser, I18nModule } from 'nestjs-i18n'

@Module({
  imports: [
    PasswordModule,
    PermissionModule,
    AuthModule,
    UserModule,
    PostModule,
    CategoryModule,
    EnvModule.forRoot({
      envFilePath: ['.env'],
    }),
    GraphQLModule.forRootAsync({
      useClass: GraphQLService,
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmService,
    }),
    I18nModule.forRootAsync({
      parser: I18nJsonParser,
      useClass: I18nConfigService,
    }),
  ],
})
export class AppModule {}
