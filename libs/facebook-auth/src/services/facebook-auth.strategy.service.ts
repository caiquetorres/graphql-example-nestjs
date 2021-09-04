import { Inject } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'

import { ModuleConstant } from '../constants/module.constant'
import { FacebookAuthModuleOptions } from '../interfaces/facebook-auth-module-options.interface'
import { FacebookUser } from '../interfaces/facebook-user.interface'
import { FacebookStrategy } from '../strategy'

/**
 * The class that represents the strategy service that deals with the "FacebookStrategy"
 * settings and behaviour after validating the user and request
 */
export class FacebookAuthStrategyService extends PassportStrategy(
  FacebookStrategy,
  'facebook',
) {
  public constructor(
    @Inject(ModuleConstant.FACEBOOK_SIGN_IN_MODULE_OPTIONS)
    facebookAuthModuleOptions: FacebookAuthModuleOptions,
  ) {
    super(facebookAuthModuleOptions)
  }

  /**
   * Method that validates the received user
   *
   * @param _accessToken defines an string that represents the token sent in request
   * @param _refreshToken defines an string that represents the refresh token
   * @param user defines an object that represents the received user from the facebook
   * @returns an object that represents the user
   */
  public validate(
    _accessToken: string,
    _refreshToken: string,
    user: FacebookUser,
  ): FacebookUser {
    return user
  }
}
