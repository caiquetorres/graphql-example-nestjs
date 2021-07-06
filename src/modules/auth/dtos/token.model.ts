import { Field, ObjectType } from '@nestjs/graphql'

/**
 * The class that represents the return token data
 */
@ObjectType()
export class TokenModel {
  @Field()
  public token: string

  @Field()
  public expiresIn: string
}
