import { DynamicModule, Module, Provider } from '@nestjs/common'

import { FacebookAuthStrategyService } from './services/facebook-auth.strategy.service'

import { ModuleConstant } from './constants/module.constant'
import { FacebookAuthAsyncOptions } from './interfaces/facebook-auth-async-options.interface'
import { FacebookAuthModuleOptions } from './interfaces/facebook-auth-module-options.interface'
import { FacebookAuthOptionsFactory } from './interfaces/facebook-auth-options-factory.interface'

@Module({})
export class FacebookAuthModule {
  public static forRoot(options: FacebookAuthModuleOptions): DynamicModule {
    return {
      global: true,
      module: FacebookAuthModule,
      providers: [
        FacebookAuthStrategyService,
        ...FacebookAuthModule.createFacebookAuthOptionsProvider(options),
      ],
      exports: [FacebookAuthStrategyService],
    }
  }

  public static forRootAsync(options: FacebookAuthAsyncOptions): DynamicModule {
    return {
      global: true,
      module: FacebookAuthModule,
      providers: [
        FacebookAuthStrategyService,
        ...FacebookAuthModule.createFacebookAuthAsyncOptionsProvider(options),
      ],
      exports: [FacebookAuthStrategyService],
    }
  }

  private static createFacebookAuthOptionsProvider(
    options: FacebookAuthModuleOptions,
  ): Provider[] {
    return [
      {
        provide: ModuleConstant.FACEBOOK_SIGN_IN_MODULE_OPTIONS,
        useValue: options,
      },
    ]
  }

  private static createFacebookAuthAsyncOptionsProvider(
    options: FacebookAuthAsyncOptions,
  ): Provider[] {
    if (options.useFactory) {
      return [
        {
          provide: ModuleConstant.FACEBOOK_SIGN_IN_MODULE_OPTIONS,
          useFactory: options.useFactory,
          inject: options.inject,
        },
      ]
    } else {
      const useClass = options.useClass
      return [
        {
          provide: ModuleConstant.FACEBOOK_SIGN_IN_MODULE_OPTIONS,
          useFactory: async (
            optionsFactory: FacebookAuthOptionsFactory,
          ): Promise<FacebookAuthModuleOptions> =>
            optionsFactory.createFacebookAuthOptions(),
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
