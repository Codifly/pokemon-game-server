import mongoose from 'mongoose';
import userSchema from './user.js';
import userQuestionsSchema from './userQuestions.js';

export const User = mongoose.model('User', userSchema);
export const UserQuestions = mongoose.model('UserQuestions', userQuestionsSchema);

export default {
  User,
  UserQuestions
}