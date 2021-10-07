import mongoose from 'mongoose';

import { UserQuestions } from './entities/index.js';

const create = (userId, questions) => {
  return UserQuestions.create({
    userId: mongoose.Types.ObjectId(userId),
    questions
  });
}

const deleteByUserId = (userId) => {
  return UserQuestions.deleteOne({ userId: mongoose.Types.ObjectId(userId) }).lean().exec();
}

const findByUserId = async (userId) => {
  const result = await UserQuestions.findOne({ userId: mongoose.Types.ObjectId(userId) }).lean().exec();
  return result;
}

export default {
  create,
  deleteByUserId,
  findByUserId
}