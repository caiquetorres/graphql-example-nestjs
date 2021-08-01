import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'

import { User } from '../../modules/user/entities/user.entity'

import { Request } from 'express'

/**
 * Decorator that is used to get from the request the user data
 */
export const CurrentUser = createParamDecorator(
  (_: unknown, context: ExecutionContext) => {
    const gqlContext = GqlExecutionContext.create(context)
    return gqlContext.getContext<{ req: Request & { user: User } }>().req.user
  },
)
