import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { AuthGuard } from '@nestjs/passport'

import { Request } from 'express'

/**
 * The class that represents the guard that protects some route
 * using the "jwt" strategy
 */
@Injectable()
export class JwtGuard extends AuthGuard('jwt') {
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

  /**
   * Method that handles the request and deals with the user and error data
   *
   * @param error defines an object that represents the error
   * @param user defines an object that represents the logged user
   * @returns an object that represents the logged user
   */
  public handleRequest<User>(error: Error, user: User): User {
    if (error || !user) {
      throw new UnauthorizedException({ key: 'exceptions.UNAUTHORIZED' })
    }

    return user
  }
}
