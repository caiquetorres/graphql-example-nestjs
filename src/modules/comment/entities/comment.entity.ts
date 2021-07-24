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
export class Comment extends Base {
  //#region Columns

  @Column({
    type: 'text',
    nullable: true,
  })
  @FilterableField({
    nullable: true,
  })
  public text: string

  @RelationId((review: Comment) => review.user)
  @FilterableField({
    nullable: true,
  })
  public userId: string

  @RelationId((review: Comment) => review.post)
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

  public constructor(partial: Partial<Comment>) {
    super()
    Object.assign(this, partial)
  }
}
