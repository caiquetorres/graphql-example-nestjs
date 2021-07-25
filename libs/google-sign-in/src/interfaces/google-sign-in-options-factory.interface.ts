import { GoogleSignInModuleOptions } from './google-sign-in-module-options.interface'

export interface GoogleSignInOptionsFactory {
  createGoogleSignInOptions():
    | GoogleSignInModuleOptions
    | Promise<GoogleSignInModuleOptions>
}
