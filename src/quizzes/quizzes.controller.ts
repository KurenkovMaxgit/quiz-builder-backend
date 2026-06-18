import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { QuizzesService } from './quizzes.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { ReturnQuizDto } from './dto/return-quiz.dto';
import { plainToInstance } from 'class-transformer';

@Controller('quizzes')
export class QuizzesController {
  constructor(private readonly quizzesService: QuizzesService) {}

  @Post()
  async create(@Body() createQuizDto: CreateQuizDto) {
    const quiz = await this.quizzesService.create(createQuizDto);
    return plainToInstance(ReturnQuizDto, quiz.toJSON());
  }

  @Get()
  findAll() {
    return this.quizzesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const quiz = await this.quizzesService.findOne(id);
    return plainToInstance(ReturnQuizDto, quiz.toJSON());
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.quizzesService.remove(id);
  }
}
