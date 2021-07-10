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
    super(
      `The entity identified by "${identifier}"${
        type ? ` of type "${type.name}"` : ''
      } is already disabled`,
      HttpStatus.CONFLICT,
    )
  }
}
