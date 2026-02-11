import { HttpStatus } from '../enums/http.enum.js';

export interface ApiResponseDto<T> {
  statusCode: HttpStatus;
  success: boolean;
  timestamp: Date;
  message: string;
  data?: T;
  stack?: string | undefined;
}
