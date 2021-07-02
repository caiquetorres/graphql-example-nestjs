import { Field, ObjectType, ID } from '@nestjs/graphql'
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity()
@ObjectType()
export class User {
  @Field(() => ID, { nullable: false })
  @PrimaryGeneratedColumn('uuid')
  public id: number

  @Field({ nullable: true })
  @CreateDateColumn()
  public createdAt: Date

  @Field({ nullable: true })
  @UpdateDateColumn()
  public updatedAt: Date

  @Field({ nullable: true })
  @Column({
    nullable: false,
    default: true,
  })
  public active: boolean

  @Field({ nullable: true })
  @Column({
    nullable: false,
    length: 50,
  })
  public name: string
}
