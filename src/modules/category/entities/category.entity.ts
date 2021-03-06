import { FilterableField } from '@nestjs-query/query-graphql'
import { ObjectType } from '@nestjs/graphql'
import { Entity, Column, ManyToMany, JoinTable } from 'typeorm'

import { Base } from '../../../common/base.entity'
import { Post } from '../../post/entities/post.entity'

@Entity()
@ObjectType({
  implements: () => [Base],
})
export class Category extends Base {
  //#region Columns

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  @FilterableField({
    nullable: false,
  })
  public name!: string

  //#endregion

  //#region Relations

  @ManyToMany(() => Post, (post) => post.categories, {
    onDelete: 'CASCADE',
  })
  @JoinTable({
    name: 'post_category',
  })
  public posts: Post[]

  //#endregion
}
