import { IDField, FilterableField } from '@nestjs-query/query-graphql'
import { ID, InterfaceType } from '@nestjs/graphql'
import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
} from 'typeorm'

/**
 * Class the represents a base entity that must be inherited for all of
 * the entities used in the application
 */
@InterfaceType()
export abstract class Base {
  @PrimaryGeneratedColumn('uuid')
  @IDField(() => ID, {
    nullable: true,
  })
  public id!: string

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
}
