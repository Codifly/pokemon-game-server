import { ErrorCode } from '../errors/Error.js';
import ServiceError from '../errors/ServiceError.js';

const errorMiddleware = async (ctx, next) => {
  try {
    await next();
  } catch(error) {
    // Always log error
    console.error(error);

    switch (error.code) {
      case ErrorCode.BAD_REQUEST:
        ctx.status = 400;
        break;
      case ErrorCode.UNAUTHORIZED:
        ctx.status = 401;
        break;
      case ErrorCode.NOT_FOUND:
        ctx.status = 404;
        break;
      default:
        ctx.status = 500;
        ctx.body = {
          code: ErrorCode.INTERNAL_SERVER_ERROR,
          message: 'Internal server error',
        }
        return;
    }
    ctx.body = {
      code: error.code,
      message: error.message,
    }
  }
}

export default errorMiddleware;