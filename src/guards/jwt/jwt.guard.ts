import { Injectable } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

/**
 * The class that represents the guard that protects some route
 * using the "jwt" strategy
 */
@Injectable()
export class JwtGuard extends AuthGuard('jwt') {}
