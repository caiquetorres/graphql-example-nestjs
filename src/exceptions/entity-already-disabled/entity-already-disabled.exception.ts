import { HttpException, HttpStatus, Type } from '@nestjs/common'

/**
 * Instantiate a EntityAlreadyDisabledException Exception.
 *
 * @example
 * ```typescript
 * throw new EntityAlreadyDisabledException(1, User)
 * ```
 *
 * @param identifier stores the entity id or unique identifier value
 * @param type stores the entity type
 */
export class EntityAlreadyDisabledException extends HttpException {
  public constructor(identifier: number | string, type?: Type<unknown>) {
    if (type) {
      super(
        {
          key: 'exceptions.ENTITY_ALREADY_DISABLED_WITH_TYPE',
          args: {
            identifier,
            type: type.name,
          },
        },
        HttpStatus.CONFLICT,
      )
    } else {
      super(
        {
          key: 'exceptions.ENTITY_ALREADY_DISABLED',
          args: {
            identifier,
          },
        },
        HttpStatus.CONFLICT,
      )
    }
  }
}
