import { HttpException, HttpStatus, Type } from '@nestjs/common'

/**
 * Instantiate a EntityNotFoundException Exception.
 *
 * @example
 * ```typescript
 * throw new EntityNotFoundException(1, User)
 * ```
 *
 * @param identifier defines the entity id or unique identifier value
 * @param type defines the entity type
 */
export class EntityNotFoundException extends HttpException {
  public constructor(identifier: number | string, type?: Type<unknown>) {
    if (type) {
      super(
        {
          key: 'exceptions.ENTITY_NOT_FOUND_WITH_TYPE',
          args: {
            identifier,
            type: type.name,
          },
        },
        HttpStatus.NOT_FOUND,
      )
    } else {
      super(
        {
          key: 'exceptions.ENTITY_NOT_FOUND',
          args: {
            identifier,
          },
        },
        HttpStatus.NOT_FOUND,
      )
    }
  }
}
