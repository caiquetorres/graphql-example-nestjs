import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'

import { GraphQLService } from './modules/graphql/graphql.service'

import { EnvModule } from './modules/env/env.module'

@Module({
  imports: [
    EnvModule.forRoot({
      envFilePath: ['.env'],
    }),
    GraphQLModule.forRootAsync({
      useClass: GraphQLService,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
