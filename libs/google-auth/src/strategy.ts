import { GoogleUser } from './interfaces'
import { Request } from 'express'
import {
  Strategy,
  VerifyFunction,
  StrategyOptions,
  InternalOAuthError,
} from 'passport-oauth2'

const authorizationURL = 'https://accounts.google.com/o/oauth2/auth'
const tokenURL = 'https://accounts.google.com/o/oauth2/token'
const userUrl = 'https://www.googleapis.com/oauth2/v1/userinfo'

/**
 * The class that represents the strategy that deals with the google authorization
 */
export class GoogleStrategy extends Strategy {
  public constructor(options: StrategyOptions, verify: VerifyFunction) {
    options = options || ({} as StrategyOptions)

    options.authorizationURL ??= authorizationURL
    options.tokenURL ??= tokenURL

    super(options, verify)

    this.name = 'google'
  }

  /**
   * Method that authenticates the request, testing if it has all the needed properties
   * and getting the user after that
   *
   * @param request defines an object that represents the request
   */
  public authenticate(request: Request): void {
    if (!request.body || (request.query && request.query.error)) {
      return this.fail()
    }

    const accessToken =
      request.headers.access_token ||
      request.body.access_token ||
      request.query.access_token

    const refreshToken =
      request.headers.refresh_token ||
      request.body.refresh_token ||
      request.query.refresh_token

    const self = this as any
    self._loadUserProfile(accessToken, (error: Error, profile: GoogleUser) => {
      if (error) {
        return self.error(error)
      }

      const verified = (error: Error, user: unknown, info: unknown) => {
        if (error) {
          return self.error(error)
        }
        if (!user) {
          return self.fail(info)
        }

        return self.success(user, info)
      }

      if (self._passReqToCallback) {
        self._verify(request, accessToken, refreshToken, profile, verified)
      } else {
        self._verify(accessToken, refreshToken, profile, verified)
      }
    })
  }

  /**
   * Method that fetches for the user data
   *
   * @param accessToken defines oauth2 access token for google
   * @param done defines a callback that will be called when request completed
   */
  public userProfile(
    accessToken: string,
    done: (error?: Error, profile?: unknown) => void,
  ): void {
    this._oauth2.get(userUrl, accessToken, (error, body) => {
      if (error) {
        return void done(
          new InternalOAuthError('Failed to fetch user profile', error),
        )
      }

      done(null, JSON.parse(body as string))

      try {
      } catch (e) {
        done(e)
      }
    })
  }
}
