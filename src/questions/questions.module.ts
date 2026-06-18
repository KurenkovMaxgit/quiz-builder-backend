import { Module } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { SequelizeModule } from '@nestjs/sequelize';
import Question from '../common/entities/question.entity';
import { AnswersModule } from '../answers/answers.module';

@Module({
  imports: [SequelizeModule.forFeature([Question]), AnswersModule],
  providers: [QuestionsService],
  exports: [QuestionsService],
})
export class QuestionsModule {}
