import { INestApplication, ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'

import { EnvService } from './modules/env/services/env.service'

import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const envService = app.get(EnvService)

  setupPipes(app)

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

//#endregion
