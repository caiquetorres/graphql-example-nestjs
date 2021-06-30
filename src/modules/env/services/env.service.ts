import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import { EnvironmentVariables } from '../models/enviroment-variables.model'

@Injectable()
export class EnvService {
  public constructor(
    private readonly configService: ConfigService<EnvironmentVariables>,
  ) {}

  public get<T extends keyof EnvironmentVariables>(
    variable: T,
  ): EnvironmentVariables[T] {
    return this.configService.get<EnvironmentVariables[T]>(variable)
  }
}
