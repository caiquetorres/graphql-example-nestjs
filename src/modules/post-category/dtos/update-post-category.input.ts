import { Field, InputType } from '@nestjs/graphql'

import { IsOptional, IsString, IsUUID } from 'class-validator'

/**
 * The class that represents the input that will perform the creation
 */
@InputType()
export class UpdatePostCategoryInput {
  @IsOptional()
  @IsString({ message: 'It is required to send a valid string' })
  @IsUUID('all', { message: 'It is required to send a valid UUID' })
  @Field({ nullable: false })
  public postId?: string

  @IsOptional()
  @IsString({ message: 'It is required to send a valid string' })
  @IsUUID('all', { message: 'It is required to send a valid UUID' })
  @Field({ nullable: false })
  public categoryId?: string
}
