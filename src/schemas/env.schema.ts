import z from 'zod';

export const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'test', 'production'])
    .default('development'),
  BASE_URL: z.url(),
  PORT: z.coerce.number().default(3000),
  LOG_LEVEL: z.enum(['info', 'debug']).default('info'),
  UPLOAD_LIMIT: z.coerce.number().default(1),
  UPLOAD_MAX_SIZE: z.coerce.number().default(10),
  REDIS_PASSWORD: z.string(),
  REDIS_PORT: z.coerce.number().default(6379),
  REDIS_HOST: z.string().default('localhost'),
});
