import { Module } from '@nestjs/common'

import { EnvModule } from './modules/env/env.module'

@Module({
  imports: [
    EnvModule.forRoot({
      envFilePath: ['.env'],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
