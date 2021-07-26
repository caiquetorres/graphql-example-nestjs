import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException,
} from '@nestjs/common'

import { Request } from 'express'

import { GoogleSignInService } from '..'

/**
 * The class that represents the guard that gets the user from the google
 * token incoming in the request
 */
@Injectable()
export class GoogleSignInGuard implements CanActivate {
  public constructor(
    private readonly googleSignInService: GoogleSignInService,
  ) {}

  /**
   * Method that returns from the current context the incoming request
   *
   * @param context defines an object that represents the current context
   * @returns the incoming request from the current context
   */
  protected getRequest(context: ExecutionContext): Request {
    return context.switchToHttp().getRequest()
  }

  /**
   * Method that says if the user can continue with the request
   *
   * @param context defines an object that represents the current context
   * @returns true, if the user can continue, otherwise false
   */
  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = this.getRequest(context)

    try {
      const user = await this.googleSignInService.getProfileByToken(
        request.headers.authorization,
      )
      request.user = user
      return true
    } catch {
      throw new BadRequestException('Token invalid')
    }
  }
}
