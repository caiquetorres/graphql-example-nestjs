import { Field, InputType } from '@nestjs/graphql'

import { IsDefined, IsOptional, IsString, IsUUID } from 'class-validator'

@InputType()
export class CreateCommentInput {
  @IsOptional()
  @IsString({ message: 'It is required to send a valid string' })
  @Field({ nullable: true })
  public text?: string

  @IsDefined({ message: 'It is required to send the userId' })
  @IsString({ message: 'It is required to send a valid string' })
  @IsUUID('all', { message: 'It is required to send a valid UUID' })
  @Field({ nullable: false })
  public userId: string

  @IsDefined({ message: 'It is required to send the postId' })
  @IsString({ message: 'It is required to send a valid string' })
  @IsUUID('all', { message: 'It is required to send a valid UUID' })
  @Field({ nullable: false })
  public postId: string
}
