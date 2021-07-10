import { HttpException, HttpStatus, Type } from '@nestjs/common'

/**
 * Instantiate a EntityAlreadyEnabledException Exception.
 *
 * @example
 * ```typescript
 * throw new EntityAlreadyEnabledException(1, EntityType)
 * ```
 *
 * @param identifier stores the entity id or unique identifier value
 * @param type stores the entity type
 */
export class EntityAlreadyEnabledException extends HttpException {
  public constructor(identifier: number | string, type?: Type<unknown>) {
    if (type) {
      super(
        {
          key: 'exceptions.ENTITY_ALREADY_ENABLED_WITH_TYPE',
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
          key: 'exceptions.ENTITY_ALREADY_ENABLED',
          args: {
            identifier,
          },
        },
        HttpStatus.CONFLICT,
      )
    }
  }
}
