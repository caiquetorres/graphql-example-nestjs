import { FilterableField } from '@nestjs-query/query-graphql'
import { Field, ID, ObjectType } from '@nestjs/graphql'
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  RelationId,
} from 'typeorm'

import { Base } from 'src/common/base.entity'
import { Category } from 'src/modules/category/entities/category.entity'
import { Review } from 'src/modules/review/entities/review.entity'
import { User } from 'src/modules/user/entities/user.entity'

/**
 * The class that represents the user post
 */
@Entity()
@ObjectType({
  implements: () => [Base],
})
export class Post extends Base {
  //#region Columns

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
  @Field({
    nullable: true,
  })
  public imageUrl?: string

  @RelationId((post: Post) => post.user)
  @FilterableField(() => ID, {
    nullable: true,
  })
  public userId!: string

  //#endregion

  //#region Relations

  @ManyToOne(() => User, (user) => user.posts, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  public user!: User

  @OneToMany(() => Review, (review) => review.post)
  public reviews: Review[]

  @ManyToMany(() => Category, (category) => category.posts, {
    onDelete: 'CASCADE',
  })
  public categories: Category[]

  //#endregion

  public constructor(partial: Partial<Post>) {
    super()
    Object.assign(this, partial)
  }
}
