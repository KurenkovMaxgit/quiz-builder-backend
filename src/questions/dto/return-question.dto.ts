import { Exclude, Expose, Type } from 'class-transformer';
import { QuestionType } from '../../utils/enums';
import { ReturnAnswerDto } from '../../answers/dto/return-answer.dto';

@Exclude()
export class ReturnQuestionDto {
  @Expose()
  id!: string;

  @Expose()
  prompt!: string;

  @Expose()
  type!: QuestionType;

  @Expose()
  @Type(() => ReturnAnswerDto)
  answers!: ReturnAnswerDto[];

  @Expose()
  createdAt!: Date;

  @Expose()
  updatedAt!: Date;
}
