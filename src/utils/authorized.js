import jwt from 'jsonwebtoken';

import userRepository from '../data/userRepository.js';
import UnauthorizedError from '../errors/UnauthorizedError.js';

const SECRET = process.env.SECRET;

const validateToken = (token) => {
  return jwt.verify(token, SECRET);
}

const authorized = async (ctx, next) => {
  let token = ctx?.request?.header?.authorization;
  let user;

  try {
    const decoded = validateToken(token);
    user = await userRepository.findUserById(decoded.id);
  } catch(error) {
    throw new UnauthorizedError('You are not authorized to perform this action');
  }

  ctx.authorizedUser = {
    ...user,
    token,
  }

  await next();
}

export default authorized;