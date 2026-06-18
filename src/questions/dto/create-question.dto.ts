import {
  ArrayMinSize,
  IsEnum,
  IsString,
  Length,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { QuestionType } from '../../utils/enums';
import { CreateAnswerDto } from '../../answers/dto/create-answer.dto';

export class CreateQuestionDto {
  @Length(1, 500)
  @IsString()
  prompt!: string;

  @IsEnum(QuestionType)
  type!: QuestionType;

  @ArrayMinSize(2, {
    message: 'Each question must have at least 2 answer options',
  })
  @ValidateNested({ each: true })
  @Type(() => CreateAnswerDto)
  answers!: CreateAnswerDto[];
}
