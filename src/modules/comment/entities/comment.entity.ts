import { FilterableField } from '@nestjs-query/query-graphql'
import { ObjectType } from '@nestjs/graphql'
import { Entity, Column, RelationId, ManyToOne } from 'typeorm'

import { Base } from '../../../common/base.entity'
import { Post } from '../../post/entities/post.entity'
import { User } from '../../user/entities/user.entity'

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

  @ManyToOne(() => User, (user) => user.comments, {
    onDelete: 'CASCADE',
  })
  public user: User

  @ManyToOne(() => Post, (post) => post.comments, {
    onDelete: 'CASCADE',
  })
  public post: Post

  //#endregion

  public constructor(partial: Partial<Comment>) {
    super()
    Object.assign(this, partial)
  }
}
