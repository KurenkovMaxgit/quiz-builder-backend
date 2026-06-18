import { Module } from '@nestjs/common';
import { QuizzesService } from './quizzes.service';
import { QuizzesController } from './quizzes.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import Quiz from '../common/entities/quiz.entity';
import { QuestionsModule } from '../questions/questions.module';

@Module({
  imports: [SequelizeModule.forFeature([Quiz]), QuestionsModule],
  controllers: [QuizzesController],
  providers: [QuizzesService],
})
export class QuizzesModule {}
