import { DynamicModule, Module, Provider } from '@nestjs/common'

import { GoogleAuthService } from './services/google-auth.service'

import { ModuleConstant } from './constants/module.constant'
import { GoogleAuthAsyncOptions } from './interfaces/google-auth-async-options.interface'
import { GoogleAuthModuleOptions } from './interfaces/google-auth-module-options.interface'
import { GoogleAuthOptionsFactory } from './interfaces/google-auth-options-factory.interface'

@Module({})
export class GoogleAuthModule {
  public static forRoot(options: GoogleAuthModuleOptions): DynamicModule {
    return {
      global: true,
      module: GoogleAuthModule,
      providers: [
        GoogleAuthService,
        ...GoogleAuthModule.createGoogleAuthOptionsProvider(options),
      ],
      exports: [GoogleAuthService],
    }
  }

  public static forRootAsync(options: GoogleAuthAsyncOptions): DynamicModule {
    return {
      global: true,
      module: GoogleAuthModule,
      providers: [
        GoogleAuthService,
        ...GoogleAuthModule.createGoogleAuthAsyncOptionsProvider(options),
      ],
      exports: [GoogleAuthService],
    }
  }

  private static createGoogleAuthOptionsProvider(
    options: GoogleAuthModuleOptions,
  ): Provider[] {
    return [
      {
        provide: ModuleConstant.GOOGLE_SIGN_IN_MODULE_OPTIONS,
        useValue: options,
      },
    ]
  }

  private static createGoogleAuthAsyncOptionsProvider(
    options: GoogleAuthAsyncOptions,
  ): Provider[] {
    if (options.useFactory) {
      return [
        {
          provide: ModuleConstant.GOOGLE_SIGN_IN_MODULE_OPTIONS,
          useFactory: options.useFactory,
          inject: options.inject,
        },
      ]
    } else {
      const useClass = options.useClass
      return [
        {
          provide: ModuleConstant.GOOGLE_SIGN_IN_MODULE_OPTIONS,
          useFactory: async (
            optionsFactory: GoogleAuthOptionsFactory,
          ): Promise<GoogleAuthModuleOptions> =>
            optionsFactory.createGoogleAuthOptions(),
          inject: [options.useExisting || options.useClass],
        },
        useClass && {
          provide: useClass,
          useClass: useClass,
        },
      ]
    }
  }
}
