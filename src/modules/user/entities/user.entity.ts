import { FilterableField, IDField } from '@nestjs-query/query-graphql'
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
  @IDField(() => ID, {
    nullable: false,
  })
  public id!: string

  @CreateDateColumn()
  @FilterableField({
    nullable: true,
  })
  public createdAt!: Date

  @UpdateDateColumn()
  @FilterableField({
    nullable: true,
  })
  public updatedAt!: Date

  @Column({
    nullable: false,
    default: true,
  })
  @FilterableField({
    nullable: true,
  })
  public active!: boolean

  @Column({
    nullable: false,
    length: 50,
  })
  @FilterableField()
  public name!: string

  @Column({
    nullable: false,
    length: 75,
  })
  @FilterableField({
    nullable: true,
  })
  public email!: string

  @Column({
    nullable: false,
  })
  public password!: string

  @Column({
    nullable: false,
    length: 12,
  })
  @Field({
    nullable: true,
    name: 'permissions',
  })
  public roles!: string

  public constructor(partial: Partial<User>) {
    Object.assign(this, partial)
  }
}
