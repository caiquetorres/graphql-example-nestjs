import { DynamicModule, Module, Provider } from '@nestjs/common'

import { GoogleSignInService } from './services/google-sign-in.service'

import { ModuleConstant } from './constants/module.constant'
import { GoogleSignInAsyncOptions } from './interfaces/google-sign-in-async-options.interface'
import { GoogleSignInModuleOptions } from './interfaces/google-sign-in-module-options.interface'
import { GoogleSignInOptionsFactory } from './interfaces/google-sign-in-options-factory.interface'

@Module({})
export class GoogleSignInModule {
  public static forRoot(options: GoogleSignInModuleOptions): DynamicModule {
    return {
      global: true,
      module: GoogleSignInModule,
      providers: [
        GoogleSignInService,
        ...GoogleSignInModule.createGoogleSignInOptionsProvider(options),
      ],
      exports: [GoogleSignInService],
    }
  }

  public static forRootAsync(options: GoogleSignInAsyncOptions): DynamicModule {
    return {
      global: true,
      module: GoogleSignInModule,
      providers: [
        GoogleSignInService,
        ...GoogleSignInModule.createGoogleSignInAsyncOptionsProvider(options),
      ],
      exports: [GoogleSignInService],
    }
  }

  private static createGoogleSignInOptionsProvider(
    options: GoogleSignInModuleOptions,
  ): Provider[] {
    return [
      {
        provide: ModuleConstant.GOOGLE_SIGN_IN_MODULE_OPTIONS,
        useValue: options,
      },
    ]
  }

  private static createGoogleSignInAsyncOptionsProvider(
    options: GoogleSignInAsyncOptions,
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
            optionsFactory: GoogleSignInOptionsFactory,
          ): Promise<GoogleSignInModuleOptions> =>
            optionsFactory.createGoogleSignInOptions(),
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
