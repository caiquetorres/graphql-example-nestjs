import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'

import { Request } from 'express'

import { ForbiddenException } from 'src/exceptions/forbidden/forbidden.exception'

import { GoogleSignInService } from '..'

@Injectable()
export class GoogleSignInGuard implements CanActivate {
  public constructor(
    private readonly googleSignInService: GoogleSignInService,
  ) {}

  protected getRequest(context: ExecutionContext): Request {
    return context.switchToHttp().getRequest()
  }

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = this.getRequest(context)

    try {
      const user = await this.googleSignInService.getProfileByToken(
        request.headers.authorization,
      )
      request.user = user
      return true
    } catch {
      throw new ForbiddenException()
    }
  }
}
