import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'

import { EnvService } from '../../src/modules/env/services/env.service'

import { setupPipes, setupFilters } from '../../src/utils/app'

import { AppModule } from '../../src/app.module'
import { I18nService } from 'nestjs-i18n'

/**
 * Function that creates an application instance fot using in e2e tests
 *
 * @returns an object that represents the application
 */
export async function getApplicationInstance(): Promise<INestApplication> {
  const moduleFixture = await Test.createTestingModule({
    imports: [AppModule],
  }).compile()

  const app = moduleFixture.createNestApplication()

  const envService = app.get(EnvService)
  const i18nService = app.get(I18nService)

  setupPipes(app)
  setupFilters(app, envService, i18nService)

  return app
}
