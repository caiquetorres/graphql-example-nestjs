import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { User } from '../entities/user.entity'

import { CreateUserInput } from '../models/create-user.input'

@Injectable()
export class UserService {
  public constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  public async createOne(createUserInput: CreateUserInput): Promise<User> {
    return await this.userRepository.save(createUserInput)
  }

  public async getOne(userId: string): Promise<User> {
    return await this.userRepository.findOne(userId)
  }
}
