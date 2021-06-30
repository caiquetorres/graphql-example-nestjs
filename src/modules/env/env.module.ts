import { DynamicModule, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { EnvService } from './services/env.service'

import { EnvModuleOptions } from './interfaces/env-module-options.interface'

@Module({
  providers: [EnvService],
  exports: [EnvService],
})
export class EnvModule {
  static forRoot(options?: EnvModuleOptions): DynamicModule {
    return {
      module: EnvModule,
      imports: [ConfigModule.forRoot(options)],
      providers: [EnvService],
    }
  }
}
