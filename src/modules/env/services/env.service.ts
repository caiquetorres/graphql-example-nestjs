import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import { EnvironmentVariables } from '../models/enviroment-variables.model'

/**
 * The class that represents the service that deals with the environment
 * management in the application
 */
@Injectable()
export class EnvService {
  public constructor(
    private readonly configService: ConfigService<EnvironmentVariables>,
  ) {}
  /**
   * Method that gets some environment variable from the environment
   *
   * @param environmentVariable defines the variable name
   * @returns the variable value
   */
  public get<T extends keyof EnvironmentVariables>(
    environmentVariable: T,
  ): EnvironmentVariables[T] {
    return this.configService.get<EnvironmentVariables[T]>(environmentVariable)
  }
}
