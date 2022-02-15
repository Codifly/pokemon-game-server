import 'dotenv/config';

import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import cors from '@koa/cors';
import mongoose from 'mongoose';

import authorizationRoutes from './src/web/authorization.js';
import leaderboardRoutes from './src/web/leaderboard.js';
import questionsRoutes from './src/web/questions.js';
import errorMiddleware from './src/utils/errorMiddleware.js';

const PORT = process.env.PORT || 8080;
const DB_USER_NAME = process.env.DB_USER_NAME;
const DB_USER_PASSWORD = process.env.DB_USER_PASSWORD;
const DB_URL = process.env.DB_URL;
const DB_NAME = process.env.DB_NAME;

async function start() {
  const app = new Koa();
  app.use(cors())

  await mongoose.connect(`mongodb+srv://${DB_USER_NAME}:${DB_USER_PASSWORD}@${DB_URL}/${DB_NAME}`)

  app.use(bodyParser());
  app.use(errorMiddleware);
  
  app.use(authorizationRoutes);
  app.use(leaderboardRoutes);
  app.use(questionsRoutes);
  
  app.listen(PORT, () => {
    console.log(`Server now listening on port ${PORT}`);
  });
}

start();