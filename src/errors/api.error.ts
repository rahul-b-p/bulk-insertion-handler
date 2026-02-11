import { ApiResponseDto } from '../dtos/response.dto.js';
import { env } from '../config/env.config.js';

class ApiError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number, cause: unknown) {
    super(message);
    this.statusCode = statusCode;
    this.cause = cause;
    this.name = this.constructor.name;
  }

  serialize(): ApiResponseDto<Error> {
    return {
      statusCode: this.statusCode,
      success: false,
      timestamp: new Date(),
      message: this.message,
      ...(env.NODE_ENV === 'development' && { stack: this.stack }),
    };
  }
}

export default ApiError;
