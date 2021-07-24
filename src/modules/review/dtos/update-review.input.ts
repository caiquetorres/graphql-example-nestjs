import { Field, InputType } from '@nestjs/graphql'

import { IsOptional, IsNumber, Min, Max, IsString } from 'class-validator'

@InputType()
export class UpdateReviewInput {
  @IsOptional()
  @IsNumber(
    { maxDecimalPlaces: 0 },
    { message: 'It is required to send a valid string' },
  )
  @Min(0, { message: 'It is required to send a value greater or equals 0' })
  @Max(5, { message: 'It is required to send a value smaller or equals 5' })
  @Field({ nullable: true })
  public stars?: number

  @IsOptional()
  @IsString({ message: 'It is required to send a valid string' })
  @Field({ nullable: true })
  public text?: string
}
