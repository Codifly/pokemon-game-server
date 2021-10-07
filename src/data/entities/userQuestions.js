import mongoose from 'mongoose';

const userQuestionsSchema = new mongoose.Schema({
  userId: mongoose.Types.ObjectId,
  questions: { type: [Number] },
}, {
  timestamps: true
});

export default userQuestionsSchema;