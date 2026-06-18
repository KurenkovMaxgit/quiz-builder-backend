import { Injectable } from '@nestjs/common';
import { CreateAnswerDto } from './dto/create-answer.dto';
import Answer from '../common/entities/answer.entity';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class AnswersService {
  constructor(@InjectModel(Answer) private answerRepository: typeof Answer) {}

  create(createAnswerDto: CreateAnswerDto) {
    const answer = this.answerRepository.create({
      ...createAnswerDto,
    });
    return answer;
  }
}
