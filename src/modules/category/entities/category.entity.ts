import { FilterableField } from '@nestjs-query/query-graphql'
import { ObjectType } from '@nestjs/graphql'
import { Column, Entity, ManyToMany } from 'typeorm'

import { Base } from 'src/common/base.entity'
import { Post } from 'src/modules/post/entities/post.entity'

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

  //#region Relations

  @ManyToMany(() => Post, (post) => post.categories)
  public posts: Post[]

  //#endregion

  //#endregion
}
