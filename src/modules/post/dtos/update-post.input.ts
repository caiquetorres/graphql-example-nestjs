import { Field, InputType } from '@nestjs/graphql'

import { IsOptional, IsString, IsUrl } from 'class-validator'

/**
 * The class that represents the input that will perform the update
 */
@InputType()
export class UpdatePostInput {
  @IsOptional()
  @IsString({ message: 'It is required to send a valid string' })
  @Field({ nullable: false })
  public title?: string

  @IsOptional()
  @IsString({ message: 'It is required to send a valid string' })
  @Field({ nullable: false })
  public description?: string

  @IsOptional()
  @IsString({ message: 'It is required to send a valid string' })
  @IsUrl({}, { message: 'It is required to send a valid url' })
  @Field({ nullable: false })
  public imageUrl?: string
}
