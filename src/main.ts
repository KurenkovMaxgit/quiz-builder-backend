import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { AllExceptionsFilter } from './common/filters/http-exception.filter';
import { SequelizeExceptionFilter } from './common/filters/sequelize-exception.filter';
import { validationPipeConfig } from './config/validation-pipe.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log'],
  });

  const logger = new Logger();

  const configService = app.get(ConfigService);
  const client = configService.getOrThrow<string>('client');

  app.setGlobalPrefix('api');

  app.enableCors({ origin: client, credentials: true });

  app.useGlobalInterceptors(new TransformInterceptor());

  app.useGlobalPipes(new ValidationPipe(validationPipeConfig));

  app.useGlobalFilters(
    new AllExceptionsFilter(),
    new SequelizeExceptionFilter(),
  );

  const port = configService.getOrThrow<string>('port');
  await app.listen(port, '0.0.0.0', () => {
    logger.log(
      `Running app in MODE: ${configService.getOrThrow<string>('nodeEnv')} on PORT: 0.0.0.0:${port}`,
    );
  });
}

bootstrap().catch(() => {
  process.exit(1);
});
