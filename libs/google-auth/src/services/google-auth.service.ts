import { Inject, Injectable } from '@nestjs/common'

import { ModuleConstant } from '../constants/module.constant'
import { GoogleAuthModuleOptions } from '../interfaces/google-auth-module-options.interface'
import { User } from '../interfaces/google-user.interface'
import { OAuth2Client } from 'google-auth-library'

/**
 * The class that represents the service that deals with the google sign in
 * data
 */
@Injectable()
export class GoogleAuthService {
  /**
   * Property that represents the google client
   */
  private readonly oath2Client: OAuth2Client

  public constructor(
    @Inject(ModuleConstant.GOOGLE_SIGN_IN_MODULE_OPTIONS)
    private readonly googleAuthModuleOptions: GoogleAuthModuleOptions,
  ) {
    this.oath2Client = new OAuth2Client({
      clientId: googleAuthModuleOptions.clientId,
      clientSecret: googleAuthModuleOptions.clientSecret,
    })
  }

  /**
   * Method that returns the user data from the google token
   *
   * @param token defines the google token
   * @returns an object that represents the user got from google
   */
  public async getProfileByToken(token: string): Promise<User> {
    if (token.includes('Bearer')) {
      token = token.split(' ')[1]
    }

    const payload = await this.oath2Client
      .verifyIdToken({
        idToken: token,
        audience: [this.googleAuthModuleOptions.clientId],
      })
      .then((ticket) => ticket.getPayload())

    return {
      id: payload.sub,
      email: payload.email,
      firstName: payload.given_name,
      lastName: payload.family_name,
    }
  }
}
