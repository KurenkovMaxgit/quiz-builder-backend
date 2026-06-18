import {
  ArrayMinSize,
  IsString,
  Length,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateQuestionDto } from '../../questions/dto/create-question.dto';

export class CreateQuizDto {
  @Length(4, 250)
  @IsString()
  title!: string;

  @ArrayMinSize(1, { message: 'A quiz must contain at least 1 questions' })
  @ValidateNested({ each: true })
  @Type(() => CreateQuestionDto)
  questions!: CreateQuestionDto[];
}
