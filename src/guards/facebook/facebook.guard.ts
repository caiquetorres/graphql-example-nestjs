import { ExecutionContext } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { AuthGuard } from '@nestjs/passport'

/**
 * The class that represents the guard that protects some route
 * using the "facebook" strategy
 */
export class FacebookGuard extends AuthGuard('facebook') {
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
