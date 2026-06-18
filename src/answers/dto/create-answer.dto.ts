import { IsString, IsEnum, Length } from 'class-validator';
import { AnswerCorrectness } from '../../utils/enums';

export class CreateAnswerDto {
  @Length(4, 250)
  @IsString()
  content!: string;

  @IsEnum(AnswerCorrectness)
  correctness!: AnswerCorrectness;
}
