import { DynamicModule, Module } from '@nestjs/common'
import { Logger } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { EnvService } from './services/env.service'

import { EnvModuleOptions } from './interfaces/env-module-options.interface'
import { EnvironmentVariables } from './models/environment-variables.model'
import { plainToClass } from 'class-transformer'
import { validateSync } from 'class-validator'

@Module({})
export class EnvModule {
  static forRoot(options?: EnvModuleOptions): DynamicModule {
    return {
      module: EnvModule,
      global: options.isGlobal ?? true,
      imports: [
        ConfigModule.forRoot({
          ...options,
          validate: EnvModule.validate,
        }),
      ],
      providers: [EnvService],
      exports: [EnvService],
    }
  }

  /**
   * Method that validates all the environmens variables before the application starts
   *
   * @param config defines the variables and it values
   * @returns an object that represents the variables and it values
   */
  public static validate(
    config: Record<string, unknown>,
  ): EnvironmentVariables {
    const validatedConfig = plainToClass(EnvironmentVariables, config, {
      enableImplicitConversion: true,
    })
    const errors = validateSync(validatedConfig, {
      skipMissingProperties: false,
    })

    if (errors.length > 0) {
      Logger.error(errors.toString())
      throw new Error(errors.toString())
    }
    return validatedConfig
  }
}
