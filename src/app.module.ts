import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { TypeOrmModule } from '@nestjs/typeorm'

import { GraphQLConfigService } from './config/graphql-config/graphql-config.service'
import { TypeOrmConfigService } from './config/typeorm-config/typeorm-config.service'
import { EnvService } from './modules/env/services/env.service'

import { AuthModule } from './modules/auth/auth.module'
import { CategoryModule } from './modules/category/category.module'
import { CommentModule } from './modules/comment/comment.module'
import { EnvModule } from './modules/env/env.module'
import { PasswordModule } from './modules/password/password.module'
import { PermissionModule } from './modules/permission/permission.module'
import { PostModule } from './modules/post/post.module'
import { UserModule } from './modules/user/user.module'
import { GoogleSignInModule } from '@graphql-example/google-sign-in'
import { I18nJsonParser, I18nModule } from 'nestjs-i18n'
import * as path from 'path'

@Module({
  imports: [
    PasswordModule,
    PermissionModule,
    AuthModule,
    UserModule,
    PostModule,
    CategoryModule,
    CommentModule,
    EnvModule.forRoot({
      envFilePath: ['.env'],
    }),
    GraphQLModule.forRootAsync({
      useClass: GraphQLConfigService,
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    I18nModule.forRootAsync({
      inject: [EnvService], // FIXME: "useClass" is not working
      parser: I18nJsonParser,
      useFactory: (envService: EnvService) => ({
        fallbackLanguage: envService.get('I18N_FALLBACK_LANGUAGE'),
        fallbacks: {
          'en-*': 'en',
          'pt-*': 'pt-BR',
          pt: 'pt-BR',
        },
        parserOptions: {
          path: path.join(__dirname, '../i18n/'),
          watch: true,
        },
      }),
    }),
    GoogleSignInModule.forRootAsync({
      inject: [EnvService],
      useFactory: (envService: EnvService) => ({
        clientId: envService.get('GOOGLE_CLIENT_ID'),
        clientSecret: envService.get('GOOGLE_CLIENT_SECRET'),
      }),
    }),
  ],
})
export class AppModule {}
