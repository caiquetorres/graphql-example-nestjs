import { ExecutionContext, Injectable } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { AuthGuard } from '@nestjs/passport'

import { Request } from 'express'

/**
 * The class that represents the guard that protects some route
 * using the "google" strategy
 */
@Injectable()
export class GoogleGuard extends AuthGuard('google') {
  /**
   * Method that returns the request from the context
   *
   * @param context defines which context the application is running into
   * @returns an object that represents the request
   */
  public getRequest(context: ExecutionContext): Request {
    const gqlContext = GqlExecutionContext.create(context)
    return gqlContext.getContext<{ req: Request }>().req
  }
}
