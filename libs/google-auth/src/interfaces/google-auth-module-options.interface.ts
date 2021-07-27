import { StrategyOptions } from 'passport-oauth2'

/**
 * Interface that represents all the options needed to sign in with google
 */
export interface GoogleAuthModuleOptions extends Partial<StrategyOptions> {
  clientID: string
  clientSecret: string
}
