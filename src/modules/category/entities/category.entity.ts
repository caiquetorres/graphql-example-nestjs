import { FilterableField } from '@nestjs-query/query-graphql'
import { ObjectType } from '@nestjs/graphql'
import { Column, Entity, OneToMany } from 'typeorm'

import { Base } from 'src/common/base.entity'
import { PostCategory } from 'src/modules/post-category/entities/post-category.entity'

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

  @OneToMany(() => PostCategory, (postCategory) => postCategory.category)
  public postCategories: PostCategory

  //#endregion
}
