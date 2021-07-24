import { FilterableField } from '@nestjs-query/query-graphql'
import { ObjectType } from '@nestjs/graphql'
import { Column, Entity, ManyToOne, RelationId } from 'typeorm'

import { Base } from 'src/common/base.entity'
import { Post } from 'src/modules/post/entities/post.entity'
import { User } from 'src/modules/user/entities/user.entity'

@Entity()
@ObjectType({
  implements: [Base],
})
export class Review extends Base {
  //#region Columns

  @Column({
    type: 'int',
    default: 1,
    nullable: false,
  })
  @FilterableField({
    nullable: true,
  })
  public stars: number

  @Column({
    type: 'text',
    length: 500,
    nullable: true,
  })
  @FilterableField({
    nullable: true,
  })
  public text: string

  @RelationId((review: Review) => review.user)
  @FilterableField({
    nullable: true,
  })
  public userId: string

  @RelationId((review: Review) => review.post)
  @FilterableField({
    nullable: true,
  })
  public postId: string

  //#endregion

  //#region Relations

  @ManyToOne(() => User, (user) => user.reviews, {
    onDelete: 'CASCADE',
  })
  public user: User

  @ManyToOne(() => Post, (post) => post.reviews, {
    onDelete: 'CASCADE',
  })
  public post: Post

  //#endregion

  public constructor(partial: Partial<Review>) {
    super()
    Object.assign(this, partial)
  }
}
