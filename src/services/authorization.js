import jwt from 'jsonwebtoken';

import userRepository from '../data/userRepository.js';
import compareHash from '../utils/compareHash.js';
import generateHash from '../utils/generateHash.js';
import generateSalt from '../utils/generateSalt.js';
import UnauthorizedError from '../errors/UnauthorizedError.js';

const SECRET = process.env.SECRET;

const login = async (ctx) => {
  const { username, password } = ctx.request.body;

  let user = await userRepository.findUserByUsername(username);

  // If the user does not exist, register him.
  if (!user) {
    const salt = generateSalt();
    const hash = generateHash(password, salt);

    user = await userRepository.create({ username, salt, hash });
    console.log(`Created user '${username}'`);
  }
  
  // User exists now, check password hash.
  const { salt, hash } = user;
  const validCredentials = compareHash(password, salt, hash);

  // If credentials are wrong, throw error.
  if (!validCredentials) {
    console.log(`User '${username}' tried logging in with invalid credentials`);
    throw new UnauthorizedError('Invalid credentials');
  }
  console.log(`User '${username}' logged in successfully`);

  // If credentials correct, generate and return jwt token.
  const token = jwt.sign({ id: user._id, username: user.username }, SECRET, {
    expiresIn: '30d',
  });

  ctx.body = { token };
}

export default {
  login,
}