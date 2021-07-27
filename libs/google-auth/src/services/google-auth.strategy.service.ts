import { Inject, Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'

import { ModuleConstant } from '../constants/module.constant'
import { GoogleStrategy } from '../strategy'

import { GoogleAuthModuleOptions, GoogleUser } from '..'

/**
 * The class that represents the strategy service that deals with the "GoogleStrategy"
 * settings and behaviour after validating the user and request
 */
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

  /**
   * Method that validates the received user
   *
   * @param _accessToken defines an string that represents the token sent in request
   * @param _refreshToken defines an string that represents the refresh token
   * @param user defines an object that represents the received user from the google
   * @returns an object that represents the user
   */
  public validate(
    _accessToken: string,
    _refreshToken: string,
    user: GoogleUser,
  ): GoogleUser {
    return user
  }
}
