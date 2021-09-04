import { FacebookAuthModuleOptions } from './facebook-auth-module-options.interface'

/**
 * Interface that represents all the methods and properties needed to be implemented
 * by the factory class used to create this module
 */
export interface FacebookAuthOptionsFactory {
  createFacebookAuthOptions():
    | FacebookAuthModuleOptions
    | Promise<FacebookAuthModuleOptions>
}
