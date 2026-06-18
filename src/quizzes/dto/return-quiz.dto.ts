import { Exclude, Expose, Type } from 'class-transformer';
import { ReturnQuestionDto } from '../../questions/dto/return-question.dto';

@Exclude()
export class ReturnQuizDto {
  @Expose()
  id!: string;

  @Expose()
  title?: string;

  @Expose()
  @Type(() => ReturnQuestionDto)
  questions?: ReturnQuestionDto[];

  @Expose()
  createdAt!: Date;

  @Expose()
  updatedAt!: Date;
}
