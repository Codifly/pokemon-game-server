import { ErrorCode } from './Error.js';
import ServiceError from './ServiceError.js';

class BadRequestError extends ServiceError {
  constructor(message) {
    super(ErrorCode.BAD_REQUEST, message)
  }
}

export default BadRequestError;