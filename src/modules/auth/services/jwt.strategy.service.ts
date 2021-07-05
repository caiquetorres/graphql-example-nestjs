import { Injectable } from '@nestjs/common'
import { JwtSignOptions } from '@nestjs/jwt'
import { PassportStrategy } from '@nestjs/passport'

import { User } from 'src/modules/user/entities/user.entity'

import { AuthService } from './auth.service'
import { EnvService } from 'src/modules/env/services/env.service'

import { ExtractJwt, Strategy } from 'passport-jwt'

/**
 * The class that represents the service that deals with the jwt
 * authentication
 */
@Injectable()
export class JwtStrategyService extends PassportStrategy(Strategy) {
  public constructor(
    envService: EnvService,
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: envService.get('JWT_SECRET_KEY'),
      expiresIn: envService.get('JWT_EXPIRES_IN'),
    } as JwtSignOptions)
  }

  /**
   * Method that extracts from the request the user data
   *
   * @param user stores the user data
   * @throws {UnauthorizedException} if the informed token has no valid user or the entity is disabled
   * @returns the user data
   */
  public async validate(user: User): Promise<User> {
    return await this.authService.jwtAuthenticate(user)
  }
}
