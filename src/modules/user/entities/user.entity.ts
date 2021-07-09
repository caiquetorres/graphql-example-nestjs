import { FilterableField, IDField } from '@nestjs-query/query-graphql'
import { Field, ObjectType, ID } from '@nestjs/graphql'
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

import { Post } from 'src/modules/post/entities/post.entity'

import { RolesEnum } from 'src/models/enums/roles.enum'

/**
 * The class that represents the user entity
 */
@Entity()
@ObjectType()
export class User {
  //#region Columns

  @PrimaryGeneratedColumn('uuid')
  @IDField(() => ID, {
    nullable: false,
  })
  public id!: string

  @CreateDateColumn({
    name: 'created_at',
  })
  @FilterableField({
    nullable: true,
  })
  public createdAt!: Date

  @UpdateDateColumn({
    name: 'updated_at',
  })
  @FilterableField({
    nullable: true,
  })
  public updatedAt!: Date

  @Column({
    type: 'boolean',
    nullable: false,
    default: true,
  })
  @FilterableField({
    nullable: true,
  })
  public active!: boolean

  @Column({
    type: 'varchar',
    nullable: false,
    length: 50,
  })
  @FilterableField({
    nullable: true,
  })
  public name!: string

  @Column({
    type: 'varchar',
    nullable: false,
    length: 75,
  })
  @FilterableField({
    nullable: true,
  })
  public email!: string

  @Column({
    type: 'text',
    nullable: false,
  })
  public password!: string

  @Column({
    enum: RolesEnum,
    nullable: false,
    length: 12,
  })
  @Field({
    nullable: true,
    name: 'permissions',
  })
  public roles!: RolesEnum

  //#region Relations

  @OneToMany(() => Post, (post) => post.user)
  public posts?: Post[]

  // #endregion

  //#endregion

  public constructor(partial: Partial<User>) {
    Object.assign(this, partial)
  }
}
