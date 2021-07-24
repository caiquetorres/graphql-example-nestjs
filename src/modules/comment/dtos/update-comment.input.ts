import { Field, InputType } from '@nestjs/graphql'

import { IsOptional, IsString } from 'class-validator'

@InputType()
export class UpdateCommentInput {
  @IsOptional()
  @IsString({ message: 'It is required to send a valid string' })
  @Field({ nullable: true })
  public text?: string
}
