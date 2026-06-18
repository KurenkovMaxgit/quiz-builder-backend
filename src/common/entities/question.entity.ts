import {
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Length,
  Table,
} from 'sequelize-typescript';
import BaseEntity from './base.entity';
import { QuestionType } from '../../utils/enums';
import Answer from './answer.entity';
import Quiz from './quiz.entity';

@Table
export default class Question extends BaseEntity {
  @Length({ min: 4, max: 500 })
  @Column({ allowNull: false })
  declare prompt: string;

  @Column({
    type: DataType.ENUM(...Object.values(QuestionType)),
    allowNull: false,
  })
  declare type: QuestionType;

  @ForeignKey(() => Quiz)
  @Column({ type: DataType.UUID, allowNull: false })
  declare quiz: Quiz;

  @HasMany(() => Answer, {
    onDelete: 'CASCADE',
    hooks: true,
  })
  answers!: Answer[];
}
