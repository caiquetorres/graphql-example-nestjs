/* eslint-disable @typescript-eslint/ban-types */

import { applyDecorators, UseGuards } from '@nestjs/common'

import { Roles } from '../roles/roles.decorator'

import { JwtGuard } from '../../guards/jwt/jwt.guard'
import { RolesGuard } from '../../guards/roles/roles.guard'

import { RolesEnum } from '../../models/enums/roles.enum'

/**
 * Decorator that sets all the protect roles and it guards
 *
 * @param roles stores the roles allowed to do something
 */
export function ProtectTo(
  ...roles: RolesEnum[]
): <TFunction extends Function, Y>(
  target: unknown | TFunction,
  propertyKey?: string | symbol,
  descriptor?: TypedPropertyDescriptor<Y>,
) => void {
  return applyDecorators(Roles(...roles), UseGuards(JwtGuard, RolesGuard))
}
