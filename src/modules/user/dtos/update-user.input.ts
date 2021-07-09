import { Field, InputType } from '@nestjs/graphql'

import { IsOptional, IsString } from 'class-validator'

/**
 * The class that represents the input that will perform the update
 */
@InputType()
export class UpdateUserInput {
  @IsOptional()
  @IsString({ message: 'It is required to send a valid string' })
  @Field({ nullable: true })
  public name?: string
}
