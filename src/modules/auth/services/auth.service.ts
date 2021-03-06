import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { User } from '../../user/entities/user.entity'

import { LoginInput } from '../dtos/login.input'
import { TokenModel } from '../dtos/token.model'

import { EnvService } from '../../env/services/env.service'
import { PasswordService } from '../../password/services/password.service'
import { UserService } from '../../user/services/user.service'

/**
 * The class that represents the service that deals with the authentication
 */
@Injectable()
export class AuthService {
  public constructor(
    private readonly passwordService: PasswordService,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly envService: EnvService,
  ) {}

  /**
   * Method to perform the login
   *
   * @param loginInput defines the login input data (email and password)
   * @returns an object that represents the token data and some more information
   *
   * @note The login is being performed this way due to the discussion
   * found in this issue https://github.com/nestjs/graphql/issues/48
   */
  public async login(loginInput: LoginInput): Promise<TokenModel> {
    const { email, password } = loginInput

    const entity = await this.userService.getOneByEmail(email)

    if (!entity) {
      throw new UnauthorizedException({
        key: 'exceptions.EMAIL_OR_PASSWORD_WRONG',
      })
    }

    const passwordMatches = await this.passwordService.comparePassword(
      password,
      entity.password,
    )

    if (!passwordMatches)
      throw new UnauthorizedException({
        key: 'exceptions.EMAIL_OR_PASSWORD_WRONG',
      })

    const { id, name, roles } = entity
    const expiresIn = this.envService.get('JWT_EXPIRES_IN')

    const token = await this.jwtService.signAsync(
      { id, name, email, roles },
      { expiresIn },
    )

    return { token, expiresIn }
  }

  /**
   * Method that refreshes the logged user token
   *
   * @param requestUser stores the logged user data
   * @throws {UnauthorizedException} if the informed token has no valid user or the entity is disabled
   * @returns the token data
   */
  public async refresh(requestUser: User): Promise<TokenModel> {
    const entity = await this.userService.findOneById(requestUser.id)

    if (!entity || !entity.active) {
      throw new UnauthorizedException({
        key: 'exceptions.NO_LONGER_VALID_TOKEN',
      })
    }

    return await this.login(entity)
  }

  /**
   * Method that validates the jwt request user and ensures that this user
   * exists and he is not disabled
   *
   * @param user stores the jwt request user
   * @throws {UnauthorizedException} if the informed token has no valid user or the entity is disabled
   * @returns the user himself if exists and he is not disabled
   */
  public async jwtAuthenticate(user: User): Promise<User> {
    const entity = await this.userService.findOneById(user.id)

    if (!entity || !entity.active) {
      throw new UnauthorizedException({
        key: 'exceptions.NO_LONGER_VALID_TOKEN',
      })
    }

    return entity
  }
}
