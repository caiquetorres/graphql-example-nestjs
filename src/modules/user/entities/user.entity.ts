import { FilterableField } from '@nestjs-query/query-graphql'
import { Field, ObjectType } from '@nestjs/graphql'
import { Column, Entity, OneToMany } from 'typeorm'

import { Base } from '../../../common/base.entity'
import { Comment } from '../../comment/entities/comment.entity'
import { Post } from '../../post/entities/post.entity'

import { RolesEnum } from '../../../models/enums/roles.enum'

/**
 * The class that represents the user entity
 */
@Entity()
@ObjectType({
  implements: () => [Base],
})
export class User extends Base {
  //#region Columns

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

  //#endregion

  //#region Relations

  @OneToMany(() => Post, (post) => post.user)
  public posts?: Post[]

  @OneToMany(() => Comment, (review) => review.user)
  public comments: Comment[]

  // #endregion

  public constructor(partial: Partial<User>) {
    super()
    Object.assign(this, partial)
  }
}
