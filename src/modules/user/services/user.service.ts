import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { User } from '../entities/user.entity'

import { RolesEnum } from 'src/models/enums/roles.enum'

import { PasswordService } from 'src/modules/password/services/password.service'

import { CreateUserInput } from '../models/create-user.input'

@Injectable()
export class UserService {
  public constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly passwordService: PasswordService,
  ) {}

  public async createOne(createUserInput: CreateUserInput): Promise<User> {
    const password = await this.passwordService.encryptPassword(
      createUserInput.password,
    )

    return await this.userRepository.save({
      ...createUserInput,
      password,
      roles: RolesEnum.Common,
    })
  }

  public async getOne(userId: string): Promise<User> {
    return await this.userRepository.findOne(userId)
  }

  public async getOneByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({ where: { email } })
  }
}
