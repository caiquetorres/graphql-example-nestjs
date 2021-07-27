import { Inject, Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'

import { ModuleConstant } from '../constants/module.constant'
import { GoogleStrategy } from '../strategy'

import { GoogleAuthModuleOptions, GoogleUser } from '..'

@Injectable()
export class GoogleAuthStrategyService extends PassportStrategy(
  GoogleStrategy,
  'google',
) {
  public constructor(
    @Inject(ModuleConstant.GOOGLE_SIGN_IN_MODULE_OPTIONS)
    googleAuthModuleOptions: GoogleAuthModuleOptions,
  ) {
    super(googleAuthModuleOptions)
  }

  public validate(
    _accessToken: string,
    _refreshToken: string,
    user: GoogleUser,
  ): GoogleUser {
    console.log({
      _accessToken,
      _refreshToken,
      user,
    })

    return user
  }
}
