import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateQuizDto } from './dto/create-quiz.dto';
import Quiz from '../common/entities/quiz.entity';
import { Sequelize } from 'sequelize';
import Question from '../common/entities/question.entity';
import Answer from '../common/entities/answer.entity';
import { InjectModel } from '@nestjs/sequelize';
import { CreateQuestionDto } from '../questions/dto/create-question.dto';
import { AnswerCorrectness, QuestionType } from '../utils/enums';

@Injectable()
export class QuizzesService {
  constructor(@InjectModel(Quiz) private quizzesRepository: typeof Quiz) {}

  async create(data: CreateQuizDto): Promise<Quiz> {
    this.validateQuestions(data.questions);
    const savedQuiz = await this.quizzesRepository.create(
      {
        ...data,
      },
      {
        include: [
          {
            model: Question,
            include: [Answer],
          },
        ],
      },
    );

    const populatedQuiz = await this.quizzesRepository.findOne({
      where: { id: savedQuiz.id },
      include: [{ model: Question, include: [Answer] }],
    });

    if (!populatedQuiz) {
      throw new InternalServerErrorException(
        'Failed to retrieve the created quiz',
      );
    }

    return populatedQuiz;
  }

  async findAll(): Promise<Quiz[]> {
    const quizzes = await this.quizzesRepository.findAll({
      attributes: {
        include: [
          [
            Sequelize.fn('COUNT', Sequelize.col('questions.id')),
            'questionCount',
          ],
        ],
      },
      include: [
        {
          model: Question,
          attributes: [],
        },
      ],
      group: ['Quiz.id'],
    });
    return quizzes;
  }

  async findOne(id: string): Promise<Quiz> {
    const quiz = await this.quizzesRepository.findOne({
      where: { id },
      include: [
        {
          model: Question,
          include: [
            {
              model: Answer,
            },
          ],
        },
      ],
    });

    if (!quiz) {
      throw new NotFoundException(`Quiz with id ${id} not found`);
    }

    return quiz;
  }

  async remove(id: string): Promise<number> {
    const quiz = await this.quizzesRepository.destroy({
      where: { id },
    });

    if (!quiz) {
      throw new NotFoundException(`Quiz with id ${id} not found`);
    }

    return quiz;
  }

  private validateQuestions(questions: CreateQuestionDto[]): void {
    questions.forEach((question, index) => {
      const correctAnswersCount = question.answers.filter(
        (answer) => answer.correctness === AnswerCorrectness.CORRECT,
      ).length;

      switch (question.type) {
        case QuestionType.SINGLE_CHOICE:
          if (correctAnswersCount !== 1) {
            throw new BadRequestException(
              `Question ${index + 1} is single choice and must have exactly one correct answer. You provided ${correctAnswersCount}.`,
            );
          }
          break;

        case QuestionType.TEXT_INPUT:
          if (question.answers.length !== 1) {
            throw new BadRequestException(
              `Question ${index + 1} is text input and must contain exactly one answer object. You provided ${question.answers.length}.`,
            );
          }

          if (correctAnswersCount !== 1) {
            throw new BadRequestException(
              `Question ${index + 1} is text input, and its answer must be marked as correct.`,
            );
          }
          break;

        case QuestionType.MULTIPLE_CHOICE:
          if (correctAnswersCount < 1) {
            throw new BadRequestException(
              `Question ${index + 1} is multiple choice and must have at least one correct answer. You provided 0.`,
            );
          }
          break;

        default:
          throw new BadRequestException(
            `Question ${index + 1} has an unsupported type: ${question.type}`,
          );
      }
    });
  }
}
