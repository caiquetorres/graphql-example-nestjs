import { ModuleMetadata, Type } from '@nestjs/common'

import { FacebookAuthModuleOptions } from './facebook-auth-module-options.interface'
import { FacebookAuthOptionsFactory } from './facebook-auth-options-factory.interface'

/**
 * Interface that represents the optional options used to created this module
 */
export interface FacebookAuthAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  useExisting?: Type<FacebookAuthOptionsFactory>
  useClass?: Type<FacebookAuthOptionsFactory>
  useFactory?(...args: unknown[]): FacebookAuthModuleOptions
  inject?: Type<unknown>[]
}
