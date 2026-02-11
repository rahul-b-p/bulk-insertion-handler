import express from 'express';
import {
  errorHandler,
  notFoundHandler,
} from './middlewares/error.middleware.js';
import router from './routes/index.js';

const app = express();

// using router
app.use('/api/v1', router);

// using not found handler
app.use(notFoundHandler);

// using error handler
app.use(errorHandler);

export default app;
