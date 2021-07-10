import { INestApplication, ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'

import { EnvService } from './modules/env/services/env.service'

import { AppModule } from './app.module'
import { I18nFilter } from './filters/i18n/i18n.filter'
import { SentryFilter } from './filters/sentry/sentry.filter'
import { I18nService } from 'nestjs-i18n'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const envService = app.get(EnvService)
  const i18nService = app.get(I18nService)

  setupPipes(app)
  setupFilters(app, envService, i18nService)

  app.enableCors()

  await app.listen(envService.get('PORT') || 3000)
}

bootstrap()

//#region Setup

/**
 * Function that set the global pipes to the application
 *
 * @param app stores the application instance
 */
function setupPipes(app: INestApplication): void {
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
function setupFilters(
  app: INestApplication,
  envService: EnvService,
  i18nService: I18nService,
): void {
  app.useGlobalFilters(
    new SentryFilter(envService),
    new I18nFilter(i18nService),
  )
}

//#endregion
