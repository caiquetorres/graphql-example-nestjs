import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { GqlExecutionContext } from '@nestjs/graphql'

import { ForbiddenException } from '../../exceptions/forbidden/forbidden.exception'

import { User } from '../../modules/user/entities/user.entity'

import { Request } from 'express'

/**
 * The class that represents the guard that protects some route comparing
 * the roles saved in the metadata
 */
@Injectable()
export class RolesGuard implements CanActivate {
  /**
   * Method that is called before the route be accessed
   *
   * @param context stores the current execution context
   * @returns true if the can be accessed, otherwise false
   */
  public canActivate(context: ExecutionContext): boolean {
    const roles = new Reflector().get<string[]>('roles', context.getHandler())

    if (!roles) {
      return true
    }

    const { user } = GqlExecutionContext.create(context).getContext<{
      req: Request & { user: User }
    }>().req

    if (!user) {
      throw new ForbiddenException()
    }

    const hasRole = user.roles.split('|').some((role) => roles.includes(role))

    if (user.roles && hasRole) {
      return true
    }

    throw new ForbiddenException()
  }
}
