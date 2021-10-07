import { ErrorCode } from './Error.js';
import ServiceError from './ServiceError.js';

class UnauthorizedError extends ServiceError {
  constructor(message) {
    super(ErrorCode.UNAUTHORIZED, message)
  }
}

export default UnauthorizedError;