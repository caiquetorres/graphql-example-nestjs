import { ModuleMetadata, Type } from '@nestjs/common'

import { GoogleAuthModuleOptions } from './google-auth-module-options.interface'
import { GoogleAuthOptionsFactory } from './google-auth-options-factory.interface'

/**
 * Interface that represents the optional options used to created this module
 */
export interface GoogleAuthAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  useExisting?: Type<GoogleAuthOptionsFactory>
  useClass?: Type<GoogleAuthOptionsFactory>
  useFactory?(...args: unknown[]): GoogleAuthModuleOptions
  inject?: Type<unknown>[]
}
