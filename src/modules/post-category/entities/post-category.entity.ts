import { ObjectType } from '@nestjs/graphql'
import { Entity, ManyToOne, RelationId } from 'typeorm'

import { Base } from 'src/common/base.entity'
import { Category } from 'src/modules/category/entities/category.entity'
import { Post } from 'src/modules/post/entities/post.entity'

/**
 * The class that represents the post-category relational entity
 */
@Entity()
@ObjectType({
  implements: () => [Base],
})
export class PostCategory extends Base {
  //#region Columns

  @RelationId((postCategory: PostCategory) => postCategory.post)
  public postId!: string

  @RelationId((postCategory: PostCategory) => postCategory.category)
  public categoryId!: string

  //#endregion

  //#region Relations

  @ManyToOne(() => Post, (post) => post.postCategories, {
    onDelete: 'CASCADE',
  })
  public post!: Post

  @ManyToOne(() => Category, (category) => category.postCategories, {
    onDelete: 'CASCADE',
  })
  public category!: Category

  //#endregion

  public constructor(partial: Partial<PostCategory>) {
    super()
    Object.assign(this, partial)
  }
}
