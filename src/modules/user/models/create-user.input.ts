import { Field, InputType } from '@nestjs/graphql'

import { IsDefined, IsEmail, IsString } from 'class-validator'

/**
 * The class that represents the input that will perform the creation
 */
@InputType()
export class CreateUserInput {
  @IsDefined({ message: 'It is required to send the name' })
  @IsString({ message: 'It is required to send a valid string' })
  @Field({ nullable: false })
  public name: string

  @IsDefined({ message: 'It is required to send the email' })
  @IsString({ message: 'It is required to send a valid string' })
  @IsEmail({}, { message: 'It is required to send a valid e-mail' })
  @Field({ nullable: false })
  public email: string

  @IsDefined({ message: 'It is required to send the password' })
  @IsString({ message: 'It is required to send a valid string' })
  @Field({ nullable: false })
  public password: string
}
