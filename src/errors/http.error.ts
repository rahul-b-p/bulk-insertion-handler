import errorsConstant from '../constants/errors.constant.js';
import { HttpStatus } from '../enums/http.enum.js';
import ApiError from './api.error.js';

class HttpError extends ApiError {
  constructor(status: HttpStatus, message?: string, cause?: unknown) {
    if (!message) {
      switch (status) {
        case HttpStatus.BAD_REQUEST:
          message = errorsConstant.BAD_REQUEST;
          break;
        case HttpStatus.UNAUTHORIZED:
          message = errorsConstant.UNAUTHORIZED;
          break;
        case HttpStatus.FORBIDDEN:
          message = errorsConstant.FORBIDDEN;
          break;
        case HttpStatus.NOT_FOUND:
          message = errorsConstant.NOT_FOUND;
          break;
        case HttpStatus.CONFLICT:
          message = errorsConstant.CONFLICT;
          break;
        case HttpStatus.INTERNAL_SERVER:
          message = errorsConstant.INTERNAL_SERVER_ERROR;
          break;
        default:
          message = errorsConstant.INTERNAL_SERVER_ERROR;
          break;
      }
    }
    super(message, status, cause);
  }
}

export default HttpError;
