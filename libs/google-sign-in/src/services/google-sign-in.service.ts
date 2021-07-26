import { Inject, Injectable } from '@nestjs/common'

import { ModuleConstant } from '../constants/module.constant'
import { GoogleSignInModuleOptions } from '../interfaces/google-sign-in-module-options.interface'
import { GoogleUser } from '../interfaces/google-user.interface'
import { OAuth2Client } from 'google-auth-library'

@Injectable()
export class GoogleSignInService {
  private readonly oath2Client: OAuth2Client

  public constructor(
    @Inject(ModuleConstant.GOOGLE_SIGN_IN_MODULE_OPTIONS)
    private readonly googleSignInModuleOptions: GoogleSignInModuleOptions,
  ) {
    this.oath2Client = new OAuth2Client({
      clientId: googleSignInModuleOptions.clientId,
      clientSecret: googleSignInModuleOptions.clientSecret,
    })
  }

  public async getProfileByToken(token: string): Promise<GoogleUser> {
    if (token.includes('Bearer')) {
      token = token.split(' ')[1]
    }

    const payload = await this.oath2Client
      .verifyIdToken({
        idToken: token,
        audience: [this.googleSignInModuleOptions.clientId],
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
