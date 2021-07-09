import { Catch, HttpException, HttpStatus } from '@nestjs/common'
import { GqlExceptionFilter } from '@nestjs/graphql'
import * as Sentry from '@sentry/node'

import { EnvService } from 'src/modules/env/services/env.service'

/**
 * The app's main sentry filter class
 *
 * Class that capture some exception and send it to sentry.io
 */
@Catch()
export class SentryFilter implements GqlExceptionFilter {
  public constructor(envService: EnvService) {
    Sentry.init({
      environment: envService.get('NODE_ENV'),
      dsn: envService.get('SENTRY_DSN'),
      release: envService.get('PACKAGE_VERSION'),
    })
  }

  /**
   * Method that deals with the thrown exceptions
   *
   * @param exception stores the thrown exception
   * @param host stores the host arguments
   */
  public async catch(exception: HttpException): Promise<unknown> {
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR

    if (status >= 500) {
      Sentry.captureException(exception)
    }

    return exception
  }
}
