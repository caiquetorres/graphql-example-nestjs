import { Field, InputType } from '@nestjs/graphql'

import { IsDefined, IsString } from 'class-validator'

/**
 * The class that represents the login input data
 */
@InputType()
export class LoginInput {
  @IsDefined({ message: 'It is required to send the username' })
  @IsString({ message: 'It is required to send a valid string' })
  @Field({ nullable: false })
  public email: string

  @IsDefined({ message: 'It is required to send the password' })
  @IsString({ message: 'It is required to send a valid string' })
  @Field({ nullable: false })
  public password: string
}
