import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { JwtGuard } from 'src/guards/jwt/jwt.guard'

import { User } from '../entities/user.entity'

import { UserService } from '../services/user.service'

import { CreateUserInput } from '../models/create-user.input'

@Resolver(() => User)
export class UserResolver {
  public constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  public async createOneUser(
    @Args('input', { type: () => CreateUserInput })
    createUserInput: CreateUserInput,
  ): Promise<User> {
    return await this.userService.createOne(createUserInput)
  }

  @UseGuards(JwtGuard)
  @Query(() => User)
  public async getOneUser(@Args('id') userId: string): Promise<User> {
    return await this.userService.getOne(userId)
  }
}
