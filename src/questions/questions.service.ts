import { Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import Question from '../common/entities/question.entity';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectModel(Question) private questionRepository: typeof Question,
  ) {}

  create(createQuestionDto: CreateQuestionDto) {
    const question = this.questionRepository.create({
      ...createQuestionDto,
    });
    return question;
  }
}
