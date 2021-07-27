import { GoogleUser } from './interfaces'
import { Request } from 'express'
import {
  Strategy,
  VerifyFunction,
  StrategyOptions,
  InternalOAuthError,
} from 'passport-oauth2'

export class GoogleStrategy extends Strategy {
  public constructor(options: StrategyOptions, verify: VerifyFunction) {
    options = options || ({} as StrategyOptions)

    options.authorizationURL ??= 'https://accounts.google.com/o/oauth2/auth'
    options.tokenURL ??= 'https://accounts.google.com/o/oauth2/token'

    super(options, verify)

    this.name = 'google'
  }

  public authenticate(request: Request): unknown {
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

  public userProfile(
    accessToken: string,
    done: (error?: Error, profile?: unknown) => void,
  ): void {
    this._oauth2.get(
      'https://www.googleapis.com/oauth2/v1/userinfo',
      accessToken,
      (error, body) => {
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
      },
    )
  }
}
