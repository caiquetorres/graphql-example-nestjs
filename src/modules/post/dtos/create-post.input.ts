import { Field, InputType } from '@nestjs/graphql'

import { IsDefined, IsOptional, IsString, IsUrl, IsUUID } from 'class-validator'

/**
 * The class that represents the input that will perform the creation
 */
@InputType()
export class CreatePostInput {
  @IsDefined({ message: 'It is required to send the title' })
  @IsString({ message: 'It is required to send a valid string' })
  @Field({ nullable: false })
  public title: string

  @IsDefined({ message: 'It is required to send the description' })
  @IsString({ message: 'It is required to send a valid string' })
  @Field({ nullable: false })
  public description: string

  @IsOptional()
  @IsString({ message: 'It is required to send a valid string' })
  @IsUrl({}, { message: 'It is required to send a valid url' })
  @Field({ nullable: false })
  public imageUrl?: string

  @IsDefined({ message: 'It is required to send the userId' })
  @IsString({ message: 'It is required to send a valid string' })
  @IsUUID('all', { message: 'It is required to send a valid UUID' })
  @Field({ nullable: false })
  public userId: string
}
