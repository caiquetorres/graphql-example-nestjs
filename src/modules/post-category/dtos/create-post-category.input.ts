import { Field, InputType } from '@nestjs/graphql'

import { IsDefined, IsString, IsUUID } from 'class-validator'

/**
 * The class that represents the input that will perform the creation
 */
@InputType()
export class CreatePostCategoryInput {
  @IsDefined({ message: 'It is required to send the postId' })
  @IsString({ message: 'It is required to send a valid string' })
  @IsUUID('all', { message: 'It is required to send a valid UUID' })
  @Field({ nullable: false })
  public postId: string

  @IsDefined({ message: 'It is required to send the categoryId' })
  @IsString({ message: 'It is required to send a valid string' })
  @IsUUID('all', { message: 'It is required to send a valid UUID' })
  @Field({ nullable: false })
  public categoryId: string
}
