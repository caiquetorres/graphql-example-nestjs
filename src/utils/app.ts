import { INestApplication, ValidationPipe } from '@nestjs/common'

import { EnvService } from '../modules/env/services/env.service'

import { I18nFilter } from '../filters/i18n/i18n.filter'
import { SentryFilter } from '../filters/sentry/sentry.filter'
import { I18nService } from 'nestjs-i18n'

/**
 * Function that set the global pipes to the application
 *
 * @param app stores the application instance
 */
export function setupPipes(app: INestApplication): void {
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  )
}

/**
 * Function that set the filters to the application
 *
 * @param app stores the application instance
 * @param envService stores the application settings
 */
export function setupFilters(
  app: INestApplication,
  envService: EnvService,
  i18nService: I18nService,
): void {
  app.useGlobalFilters(
    new SentryFilter(envService),
    new I18nFilter(i18nService),
  )
}
