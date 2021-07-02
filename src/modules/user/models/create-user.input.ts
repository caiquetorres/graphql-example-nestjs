import { Field, InputType } from '@nestjs/graphql'

import { IsEmail, IsString } from 'class-validator'

@InputType()
export class CreateUserInput {
  @IsString({ message: 'It is required to send a valid string' })
  @Field({ nullable: false })
  public name: string

  @IsString({ message: 'It is required to send a valid string' })
  @IsEmail({}, { message: 'It is required to send a valid e-mail' })
  @Field({ nullable: false })
  public email: string
}
