import { NestFactory } from '@nestjs/core'

import { EnvService } from './modules/env/services/env.service'

import { setupPipes, setupFilters } from './utils/app'

import { AppModule } from './app.module'
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
