import { Inject, Injectable, Logger } from '@nestjs/common'

import { ModuleConstant } from '../constants/module.constant'
import { GoogleSignInModuleOptions } from '../interfaces/google-sign-in-module-options.interface'

@Injectable()
export class GoogleSignInService {
  public constructor(
    @Inject(ModuleConstant.GOOGLE_SIGN_IN_MODULE_OPTIONS)
    googleSignInModuleOptions: GoogleSignInModuleOptions,
  ) {
    Logger.log({
      ...googleSignInModuleOptions,
    })
    // this.oath2Client = new OAuth2Client({
    //   clientId: googleSignInModuleOptions.clientId,
    //   clientSecret: googleSignInModuleOptions.clientSecret,
    // })
  }
}
