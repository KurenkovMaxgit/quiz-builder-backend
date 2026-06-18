import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ApiResponse } from '../../utils/response.interface';
import {
  BaseError,
  EmptyResultError,
  ForeignKeyConstraintError,
  UniqueConstraintError,
  ValidationError,
} from 'sequelize';

@Catch(BaseError)
export class SequelizeExceptionFilter implements ExceptionFilter {
  catch(exception: BaseError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';

    if (exception instanceof EmptyResultError) {
      status = HttpStatus.NOT_FOUND;
      message = 'Resource not found';
    } else if (exception instanceof UniqueConstraintError) {
      status = HttpStatus.CONFLICT;
      message = 'Database conflict: Duplicate entry';
    } else if (exception instanceof ForeignKeyConstraintError) {
      status = HttpStatus.BAD_REQUEST;
      message = 'Invalid relation constraint';
    } else if (exception instanceof ValidationError) {
      status = HttpStatus.BAD_REQUEST;
      message = 'Database validation error';
    } else {
    }

    const errorBody: ApiResponse<null> = {
      success: false,
      statusCode: status,
      message,
      timestamp: new Date().toISOString(),
      path: request.url,
      data: null,
    };
    response.status(status).json(errorBody);
  }
}
