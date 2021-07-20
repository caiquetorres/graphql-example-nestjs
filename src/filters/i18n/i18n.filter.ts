import { Catch, HttpException } from '@nestjs/common'
import { GqlExceptionFilter } from '@nestjs/graphql'

import { I18nService } from 'nestjs-i18n'

/**
 * Class that represents the filter that capture some exception and tranlate
 * it for some language
 */
@Catch(HttpException)
export class I18nFilter implements GqlExceptionFilter {
  constructor(private readonly i18nService: I18nService) {}

  /**
   * Method that deals with the thrown exceptions
   *
   * @param exception defines and object that represents the thrown exception
   * @param host defines and object that represents the host arguments
   */
  public async catch(exception: HttpException): Promise<HttpException> {
    // TODO: extract from host the specified lang

    const message = exception.getResponse() as {
      key: string
      args: Record<string, unknown>
    }

    if (!message.key) {
      return exception
    }

    exception.message = await this.i18nService.translate(message.key, {
      args: message.args,
    })

    return exception
  }
}
