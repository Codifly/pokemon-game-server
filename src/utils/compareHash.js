import passwordHasher from './generateHash.js';

export default function compareHash(password, salt, hash) {
  const hashedPassword = passwordHasher(password, salt);
  if (hashedPassword === hash) {
    return true;
  }
  return false;
}