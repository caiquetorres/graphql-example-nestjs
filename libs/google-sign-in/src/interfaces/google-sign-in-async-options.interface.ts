import { ModuleMetadata, Type } from '@nestjs/common'

import { GoogleSignInOptionsFactory } from './google-sign-in-options-factory.interface'

export interface GoogleSignInAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  useExisting?: Type<GoogleSignInOptionsFactory>
  useClass?: Type<GoogleSignInOptionsFactory>
  useFactory?(
    ...args: unknown[]
  ): ReturnType<GoogleSignInOptionsFactory['createGoogleSignInOptions']>
  inject?: Type<unknown>[]
}
