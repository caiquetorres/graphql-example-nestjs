import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { TypeOrmModule } from '@nestjs/typeorm'

import { GraphQLService } from './modules/graphql/graphql.service'
import { TypeOrmService } from './modules/typeorm/typeorm.service'

import { EnvModule } from './modules/env/env.module'

@Module({
  imports: [
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
  providers: [],
})
export class AppModule {}