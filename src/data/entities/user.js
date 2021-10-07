import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: 'string' },
  hash: { type: 'string' },
  salt: { type: 'string' },
  bestResult: {
    score: { type: 'number' },
    time: { type: 'number' }
  }
});

export default userSchema;