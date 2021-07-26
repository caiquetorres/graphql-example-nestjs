import { ExecutionContext, Injectable } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'

import { GoogleSignInGuard } from '@graphql-example/google-sign-in/guards/google-sign-in.guard'

import { Request } from 'express'

@Injectable()
export class GoogleGuard extends GoogleSignInGuard {
  public getRequest(context: ExecutionContext): Request {
    return GqlExecutionContext.create(context).getContext<{
      req: Request
    }>().req
  }
}
