import { StrategyOptions } from 'passport-oauth2';

export interface FacebookAuthModuleOptions extends Partial<StrategyOptions> {
  clientID: string;
  clientSecret: string;
}
