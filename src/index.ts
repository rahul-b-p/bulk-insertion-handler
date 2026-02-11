import { Server } from 'node:http';
import app from './app.js';
import { env, validateEnv } from './config/env.config.js';
import logger from './utils/logger.utils.js';

//validating env
validateEnv();

const port = env.PORT;
let server: Server;

/**
 * to call all services for starting application
 */
const bootstarp = async (): Promise<void> => {
  // listening app
  server = app.listen(port, () => {
    logger.info(
      `App Running in ${env.NODE_ENV} environment at port : ${env.PORT}`,
    );
  });
};

/**
 * Handle graceful shutdown
 */
async function gracefulShutdown(signal: string): Promise<void> {
  logger.debug(`${signal} signal received`);

  try {
    await cleanup();
    process.exit(0);
  } catch (error) {
    logger.error('Graceful shutdown failed:', error);
    process.exit(1);
  }
}

/**
 * Cleanup resources before shutdown
 */
async function cleanup(): Promise<void> {
  logger.debug('Starting graceful shutdown...');

  try {
    // Close HTTP server
    if (server) {
      await new Promise<void>((resolve, reject) => {
        server.close((err) => {
          if (err) {
            logger.error('Error closing server:', err);
            reject(err);
          } else {
            logger.info('HTTP server closed');
            resolve();
          }
        });
      });
    }

    logger.info('Graceful shutdown completed');
  } catch (error) {
    logger.error('Error during cleanup:', error);
    throw error;
  }
}

/**
 * Handle unhandled rejections
 */
process.on(
  'unhandledRejection',
  async (reason: unknown, _promise: Promise<unknown>) => {
    logger.error('Unhandled Rejection:', {
      // Logging the promise object can be problematic if not serializable
      reason:
        reason instanceof Error
          ? { message: reason.message, stack: reason.stack }
          : reason,
    });
    await cleanup();
    process.exit(1);
  },
);

/**
 * Handle uncaught exceptions
 */
process.on('uncaughtException', async (error: Error) => {
  logger.error('Uncaught Exception:', error);
  await cleanup();
  process.exit(1);
});

/**
 * Handle termination signals
 */
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

/**
 * Handle warnings
 */
process.on('warning', (warning: Error) => {
  logger.warn('Process warning:', warning);
});

// triggering bootsrap
bootstarp();
