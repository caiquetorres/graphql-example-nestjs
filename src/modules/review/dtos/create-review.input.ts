import { Field, InputType } from '@nestjs/graphql'

import {
  IsDefined,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  Min,
} from 'class-validator'

@InputType()
export class CreateReviewInput {
  @IsDefined({ message: 'It is required to send the stars' })
  @IsNumber(
    { maxDecimalPlaces: 0 },
    { message: 'It is required to send a valid string' },
  )
  @Min(0, { message: 'It is required to send a value greater or equals 0' })
  @Max(5, { message: 'It is required to send a value smaller or equals 5' })
  @Field({ nullable: false })
  public stars: number

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
