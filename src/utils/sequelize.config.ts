import { config } from 'dotenv';
import { join } from 'path';
import { Logger as NestLogger } from '@nestjs/common';
import { Sequelize } from 'sequelize';
import { SequelizeOptions } from 'sequelize-typescript';

config({ path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env' });

const isNotProd = process.env.NODE_ENV !== 'production';
const isTest = process.env.NODE_ENV === 'test';

const nestLogger = new NestLogger('Sequelize');

const customSequelizeLogger = (query: string, timing?: number) => {
  if (timing && timing > 500) {
    nestLogger.warn(`SLOW QUERY [${timing}ms]: ${query}`);
  } else {
    nestLogger.log(query);
  }
};

export const sequelizeConfig: SequelizeOptions = {
  dialect: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  models: [join(__dirname, '../common/entities/!(base.entity).{js,ts}')],
  sync: {
    force: isTest,
    alter: isNotProd,
  },
  logging: isNotProd ? customSequelizeLogger : false,
  benchmark: isNotProd,
};
