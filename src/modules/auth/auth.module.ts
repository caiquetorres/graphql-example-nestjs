import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'

import { EnvService } from '../env/services/env.service'
import { AuthService } from './services/auth.service'
import { JwtStrategyService } from './strategies/jwt.strategy.service'

import { PasswordModule } from '../password/password.module'
import { UserModule } from '../user/user.module'
import { AuthResolver } from './resolvers/auth.resolver'

@Module({
  imports: [
    PasswordModule,
    UserModule,
    JwtModule.registerAsync({
      inject: [EnvService],
      useFactory: (envService: EnvService) => ({
        privateKey: envService.get('JWT_SECRET_KEY'),
      }),
    }),
  ],
  providers: [AuthService, JwtStrategyService, AuthResolver],
  exports: [AuthService],
})
export class AuthModule {}
