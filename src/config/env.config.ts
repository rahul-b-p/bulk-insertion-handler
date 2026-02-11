import { config } from 'dotenv';

import { envSchema } from '../schemas/env.schema.js';
import errorsConstant from '../constants/errors.constant.js';
import { EnvDto } from '../dtos/env.dto.js';

// dotenv config
config();

export const validateEnv = () => {
  try {
    envSchema.parse(process.env);
  } catch (error) {
    const envError = new Error();
    envError.cause = error;
    envError.message = errorsConstant.ENV_VALIDATION_FAILED;
  }
};

export const env: EnvDto = envSchema.parse(process.env);
