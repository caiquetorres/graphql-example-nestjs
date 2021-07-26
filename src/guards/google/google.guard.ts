import { ExecutionContext, Injectable } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'

import { GoogleSignInGuard } from '@graphql-example/google-sign-in/guards/google-sign-in.guard'

import { Request } from 'express'

/**
 * The class that represents the guard that gets the user from the google
 * token incoming in the request
 */
@Injectable()
export class GoogleGuard extends GoogleSignInGuard {
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
