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
    super(
      `The entity identified by "${identifier}"${
        type ? ` of type "${type.name}"` : ''
      } is already enabled`,
      HttpStatus.CONFLICT,
    )
  }
}
