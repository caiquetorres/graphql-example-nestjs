import { HttpException, HttpStatus } from '@nestjs/common'

/**
 * Instantiate a ForbiddenException Exception.
 *
 * @example
 * ```typescript
 * throw new ForbiddenException(1, User)
 * ```
 */
export class ForbiddenException extends HttpException {
  constructor() {
    super(
      {
        key: 'exceptions.FORBIDDEN',
      },
      HttpStatus.FORBIDDEN,
    )
  }
}
