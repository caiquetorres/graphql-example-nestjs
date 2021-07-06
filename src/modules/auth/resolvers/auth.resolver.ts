import { Args, Mutation, Resolver } from '@nestjs/graphql'

import { LoginInput } from '../dtos/login.input'
import { TokenModel } from '../dtos/token.model'

import { AuthService } from '../services/auth.service'

/**
 * The class that represents the resolver that deals with the authentication
 */
@Resolver()
export class AuthResolver {
  public constructor(private readonly authService: AuthService) {}

  /**
   * Method to perform the login
   *
   * @param loginInput defines the login input data (email and password)
   * @returns an object that represents the token data and some more information
   *
   * @note The login is being performed this way due to the discussion
   * found in this issue https://github.com/nestjs/graphql/issues/48
   */
  @Mutation(() => TokenModel)
  public async login(
    @Args('input', { type: () => LoginInput }) loginInput: LoginInput,
  ): Promise<TokenModel> {
    return await this.authService.login(loginInput)
  }
}
