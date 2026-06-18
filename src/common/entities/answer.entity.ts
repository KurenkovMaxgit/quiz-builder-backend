import BaseEntity from './base.entity';
import { AnswerCorrectness } from '../../utils/enums';
import Question from './question.entity';
import {
  Column,
  DataType,
  ForeignKey,
  Length,
  Table,
} from 'sequelize-typescript';

@Table
export default class Answer extends BaseEntity {
  @Length({ min: 4, max: 250 })
  @Column({ allowNull: false })
  declare content: string;

  @Column({
    type: DataType.ENUM(...Object.values(AnswerCorrectness)),
    allowNull: false,
  })
  declare correctness: AnswerCorrectness;

  @ForeignKey(() => Question)
  @Column({ type: DataType.UUID, allowNull: false })
  declare question: Question;
}
