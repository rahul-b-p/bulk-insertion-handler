import { env } from '../config/env.config.js';
import winston from 'winston';

const { combine, timestamp, printf, colorize } = winston.format;

const logFormat = printf(({ level, message, timestamp, ...meta }) => {
  const metaString = Object.keys(meta).length ? JSON.stringify(meta) : '';
  return `${timestamp} ${level}: ${message} ${metaString ? '\x1b[36m' + metaString + '\x1b[0m' : ''}`;
});

const logger = winston.createLogger({
  level: env.LOG_LEVEL,
  format: combine(timestamp(), logFormat),
  transports: [
    new winston.transports.Console({
      format: combine(colorize(), timestamp(), logFormat),
    }),
    new winston.transports.File({
      filename: 'error.log',
      level: 'error',
    }),
    new winston.transports.File({
      filename: 'combined.log',
    }),
  ],
});

// Don't log to files in test environment
if (env.NODE_ENV === 'test') {
  logger.transports.forEach((t) => {
    if (t instanceof winston.transports.File) {
      t.silent = true;
    }
  });
}

export default logger;
