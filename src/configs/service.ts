import { Global } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as _ from 'lodash';

@Global()
export class ConfigService {
  constructor() {
    dotenv.config({
      path: process.env.ENV_PATH
        ? `${__dirname}/../../${process.env.ENV_PATH}`
        : `${__dirname}/../../.env`,
    });
  }

  get IS_DEVELOPMENT_MODE(): boolean {
    return _.toLower(process.env.IS_DEVELOPMENT_MODE) === 'true';
  }

  get PORT(): number {
    return Number(process.env.PORT) || 3001;
  }

  get DB_URI(): string {
    return process.env.DB_URI || 'mongodb://localhost:54322/challenge';
  }

  get DB_CHALLENGE_NAME(): string {
    return _.toLower(process.env.DB_CHALLENGE_NAME) || 'challenge';
  }

  get BODY_SIZE_LIMIT(): string {
    return process.env.BODY_SIZE_LIMIT || '2mb';
  }
}

export const configService = new ConfigService();
