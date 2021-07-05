import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { User } from './entities/user.entity'

import { UserService } from './services/user.service'

import { PasswordModule } from '../password/password.module'
import { UserResolver } from './resolvers/user.resolver'

@Module({
  imports: [PasswordModule, TypeOrmModule.forFeature([User])],
  providers: [UserService, UserResolver],
  exports: [UserService],
})
export class UserModule {}
