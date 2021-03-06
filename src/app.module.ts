import { GoogleAuthModule } from '@graphql-example/google-auth'
import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { TypeOrmModule } from '@nestjs/typeorm'

import { GraphQLConfigService } from './config/graphql-config/graphql-config.service'
import { TypeOrmConfigService } from './config/typeorm-config/typeorm-config.service'
import { EnvService } from './modules/env/services/env.service'

import { FacebookAuthModule } from '../libs/facebook-auth/src'
import { AuthModule } from './modules/auth/auth.module'
import { CategoryModule } from './modules/category/category.module'
import { CommentModule } from './modules/comment/comment.module'
import { EnvModule } from './modules/env/env.module'
import { PasswordModule } from './modules/password/password.module'
import { PermissionModule } from './modules/permission/permission.module'
import { PostModule } from './modules/post/post.module'
import { UserModule } from './modules/user/user.module'
import { HeaderResolver, I18nJsonParser, I18nModule } from 'nestjs-i18n'
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
      resolvers: [new HeaderResolver(['x-custom-lang'])],
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
    GoogleAuthModule.forRootAsync({
      inject: [EnvService],
      useFactory: (envService: EnvService) => ({
        clientID: envService.get('GOOGLE_CLIENT_ID'),
        clientSecret: envService.get('GOOGLE_CLIENT_SECRET'),
      }),
    }),
    FacebookAuthModule.forRootAsync({
      inject: [EnvService],
      useFactory: (envService: EnvService) => ({
        clientID: envService.get('FACEBOOK_CLIENT_ID'),
        clientSecret: envService.get('FACEBOOK_CLIENT_SECRET'),
      }),
    }),
  ],
})
export class AppModule {}
