import { ModuleMetadata, Type } from '@nestjs/common'

import { GoogleAuthOptionsFactory } from './google-auth-options-factory.interface'

/**
 * Interface that represents the optional options used to created this module
 */
export interface GoogleAuthAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  useExisting?: Type<GoogleAuthOptionsFactory>
  useClass?: Type<GoogleAuthOptionsFactory>
  useFactory?(
    ...args: unknown[]
  ): ReturnType<GoogleAuthOptionsFactory['createGoogleAuthOptions']>
  inject?: Type<unknown>[]
}
