import z from 'zod';

export const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'test', 'production'])
    .default('development'),
  BASE_URL: z.url(),
  PORT: z.coerce.number().default(3000),
  LOG_LEVEL: z.enum(['info', 'debug']).default('info'),
});
