import { ErrorCode } from './Error.js';
import ServiceError from './ServiceError.js';

class NotFoundError extends ServiceError {
  constructor(message) {
    super(ErrorCode.NOT_FOUND, message)
  }
}

export default NotFoundError;