import { Module } from '@nestjs/common';
import { AnswersService } from './answers.service';
import { SequelizeModule } from '@nestjs/sequelize';
import Answer from '../common/entities/answer.entity';

@Module({
  imports: [SequelizeModule.forFeature([Answer])],
  providers: [AnswersService],
  exports: [AnswersService],
})
export class AnswersModule {}
