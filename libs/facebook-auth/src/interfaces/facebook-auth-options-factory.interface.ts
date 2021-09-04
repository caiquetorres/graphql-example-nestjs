import { FacebookAuthModuleOptions } from './facebook-auth-module-options.interface';

export interface FacebookAuthOptionsFactory {
  createFacebookAuthOptions():
    | FacebookAuthModuleOptions
    | Promise<FacebookAuthModuleOptions>;
}
