import { Field, ObjectType, ID } from '@nestjs/graphql'
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

/**
 * The class that represents the user entity
 */
@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID, {
    nullable: false,
  })
  public id: string

  @CreateDateColumn()
  @Field({
    nullable: true,
  })
  public createdAt: Date

  @UpdateDateColumn()
  @Field({
    nullable: true,
  })
  public updatedAt: Date

  @Column({
    nullable: false,
    default: true,
  })
  @Field({
    nullable: true,
  })
  public active: boolean

  @Column({
    nullable: false,
    length: 50,
  })
  @Field({
    nullable: true,
  })
  public name: string

  @Column({
    nullable: false,
    length: 75,
  })
  @Field({
    nullable: true,
  })
  public email: string

  @Column({
    nullable: false,
  })
  public password: string

  @Column({
    nullable: false,
    length: 12,
  })
  @Field({
    nullable: true,
    name: 'permissions',
  })
  public roles: string
}
