import { Injectable } from '@nestjs/common'

import { EnvService } from '../env/services/env.service'

import { I18nOptionsFactory, I18nOptionsWithoutResolvers } from 'nestjs-i18n'
import path from 'path'

/**
 * The class that represents the service that deals with the i18n
 * configuration
 */
@Injectable()
export class I18nConfigService implements I18nOptionsFactory {
  public constructor(private readonly envService: EnvService) {}

  /**
   * Method that creates a new configuration for the i18n
   *
   * @returns an object with all the configurations
   */
  public createI18nOptions(): I18nOptionsWithoutResolvers {
    return {
      fallbackLanguage: this.envService.get('I18N_FALLBACK_LANGUAGE'),
      parserOptions: {
        path: path.join(__dirname, this.envService.get('I18N_PATH')),
      },
    }
  }
}
