import { ErrorRequestHandler, RequestHandler } from 'express';

import ApiError from '../errors/api.error.js';
import logger from '../utils/logger.utils.js';
import { HttpStatus } from '../enums/http.enum.js';
import { env } from '../config/env.config.js';
import HttpError from '../errors/http.error.js';
import { MulterError } from 'multer';

export const notFoundHandler: RequestHandler = (req, _res, next) => {
  const error = new HttpError(
    HttpStatus.NOT_FOUND,
    `Not found - ${req.originalUrl}`,
  );
  next(error);
};

export const errorHandler: ErrorRequestHandler = (err, req, res, _next) => {
  const errorMetaData = {
    url: req.originalUrl,
    method: req.method,
    ip: req.ip,
  };

  if (err instanceof ApiError) {
    if (err.statusCode === HttpStatus.INTERNAL_SERVER) {
      logger.error(err.message, errorMetaData);
    } else {
      logger.warn(err.message, errorMetaData);
    }

    return res.status(err.statusCode).json(err.serialize());
  }

  if (err instanceof MulterError) {
    logger.warn(err.message, errorMetaData);
    return res.status(HttpStatus.BAD_REQUEST).json({
      statusCode: HttpStatus.BAD_REQUEST,
      success: false,
      timestamp: new Date(),
      message: err.message,
      ...(env.NODE_ENV === 'development' && { stack: err.stack }),
    });
  }

  logger.error(err.message, errorMetaData);
  return res.status(HttpStatus.INTERNAL_SERVER).json({
    statusCode: HttpStatus.INTERNAL_SERVER,
    success: false,
    timestamp: new Date(),
    message: err.message,
    ...(env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};
