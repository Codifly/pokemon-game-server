import mongoose from 'mongoose';
import { User } from './entities/index.js';

const create = (user) => {
  return User.create(user);
}

const update = (userId, user) => {
  return User.updateOne({ _id: mongoose.Types.ObjectId(userId) }, user);
}

const findUserById = (id) => {
  return User.findById(id).lean();
}

const findUserByUsername = (username) => {
  return User.findOne({ username }).lean();
}

const find = (filter = {}, sort = {}) => {
  return User.find(filter).sort(sort).limit(20).lean();
}

export default {
  create,
  update,
  findUserById,
  findUserByUsername,
  find,
}