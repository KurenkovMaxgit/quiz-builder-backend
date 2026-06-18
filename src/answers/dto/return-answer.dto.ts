import { Exclude, Expose } from 'class-transformer';
import { AnswerCorrectness } from '../../utils/enums';

@Exclude()
export class ReturnAnswerDto {
  @Expose()
  id!: string;

  @Expose()
  content!: string;

  @Expose()
  correctness?: AnswerCorrectness;

  @Expose()
  createdAt!: Date;

  @Expose()
  updatedAt!: Date;
}
