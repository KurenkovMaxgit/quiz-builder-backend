import { Column, HasMany, Length, Table } from 'sequelize-typescript';
import BaseEntity from './base.entity';
import Question from './question.entity';

@Table
export default class Quiz extends BaseEntity {
  @Length({ min: 4, max: 150 })
  @Column({ allowNull: false })
  declare title: string;

  @HasMany(() => Question, {
    onDelete: 'CASCADE',
    hooks: true,
  })
  declare questions: Question[];
}
