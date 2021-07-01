import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common'
import * as Sentry from '@sentry/node'

import { EnvService } from 'src/modules/env/services/env.service'

import { Request, Response } from 'express'

/**
 * The app's main sentry filter class
 *
 * Class that capture some exception and send it to sentry.io
 */
@Catch()
export class SentryFilter implements ExceptionFilter {
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
  public async catch(
    exception: HttpException,
    host: ArgumentsHost,
  ): Promise<void> {
    const context = host.switchToHttp()
    const response = context.getResponse<Response>()
    const request = context.getRequest<Request>()

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR

    if (status >= 500) {
      Sentry.captureException(exception)
    }

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: exception.message,
    })
  }
}
