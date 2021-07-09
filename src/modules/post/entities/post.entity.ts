import { FilterableField, IDField } from '@nestjs-query/query-graphql'
import { Field, ID, ObjectType } from '@nestjs/graphql'
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

import { User } from 'src/modules/user/entities/user.entity'

/**
 * The class that represents the user post
 */
@Entity()
@ObjectType()
export class Post {
  //#region Columns

  @PrimaryGeneratedColumn('uuid')
  @IDField(() => ID, {
    nullable: false,
  })
  public id!: number

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
    length: 75,
  })
  @FilterableField({
    nullable: true,
  })
  public title!: string

  @Column({
    type: 'text',
    nullable: false,
  })
  @FilterableField({
    nullable: true,
  })
  public description!: string

  @Column({
    name: 'image_url',
    type: 'text',
    nullable: true,
  })
  @Field()
  public imageUrl?: string

  @Column({
    name: 'user_id',
    nullable: false,
    type: 'varchar',
  })
  @FilterableField(() => ID, {
    nullable: true,
  })
  public userId!: string

  //#region Relations

  @ManyToOne(() => User, (user) => user.posts, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  public user!: User

  //#endregion

  //#endregion

  public constructor(partial: Partial<Post>) {
    Object.assign(this, partial)
  }
}
