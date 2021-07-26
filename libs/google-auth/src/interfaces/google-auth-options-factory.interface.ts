import { GoogleAuthModuleOptions } from './google-auth-module-options.interface'

/**
 * Interface that represents all the methods and properties needed to be implemented
 * by the factory class used to create this module
 */
export interface GoogleAuthOptionsFactory {
  createGoogleAuthOptions():
    | GoogleAuthModuleOptions
    | Promise<GoogleAuthModuleOptions>
}
