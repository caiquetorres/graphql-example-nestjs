import { Injectable } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

/**
 * The class that represents the guard that protects some route
 * using the "local" strategy
 */
@Injectable()
export class LocalGuard extends AuthGuard('local') {}
