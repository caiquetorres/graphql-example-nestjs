import { ExecutionContext, Injectable } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'

import { Request } from 'express'
import { GoogleAuthGuard } from 'libs/google-auth/src'

/**
 * The class that represents the guard that gets the user from the google
 * token incoming in the request
 */
@Injectable()
export class GoogleGuard extends GoogleAuthGuard {
  /**
   * Method that returns from the current context the incoming request
   *
   * @param context defines an object that represents the current context
   * @returns the incoming request from the current context
   */
  public getRequest(context: ExecutionContext): Request {
    return GqlExecutionContext.create(context).getContext<{
      req: Request
    }>().req
  }
}
