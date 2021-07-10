import { Field, InputType } from '@nestjs/graphql'

import { IsDefined, IsString } from 'class-validator'

/**
 * The class that represents the input that will perform the creation
 */
@InputType()
export class CreateCategoryInput {
  @IsDefined({ message: 'It is required to send the name' })
  @IsString({ message: 'It is required to send a valid string' })
  @Field({ nullable: false })
  public name: string
}
