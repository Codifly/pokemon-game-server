import mongoose from 'mongoose';

import userQuestionsRepository from '../data/userQuestionsRepository.js';
import pokemonRepository from '../data/pokemonRepository.js';
import NotFoundError from '../errors/NotFoundError.js';
import BadRequestError from '../errors/BadRequestError.js';
import userRepository from '../data/userRepository.js';

const requestQuestions = async (ctx) => {
  const { _id: userId } = ctx.authorizedUser;

  const userQuestions = await userQuestionsRepository.findByUserId(userId);

  // If the user already has a running session, return the current questions
  if (userQuestions) {
    ctx.body = userQuestions.questions;
    return;
  }

  // The user did not have a running session, generate 10 random pokemonIds
  const questions = pokemonRepository.get10RandomPokemonIds();

  // Create a new session with the generated pokemonIds
  await userQuestionsRepository.create(
    userId,
    questions
  );

  // Return the generated pokemonIds
  ctx.body = questions;
}

const submitAnswers = async (ctx) => {
  const now = Date.now();
  const { _id: userId, ...user } = ctx.authorizedUser;
  const submittedQuestions = ctx.request.body;

  const userQuestions = await userQuestionsRepository.findByUserId(userId);

  if (!userQuestions) {
    throw new NotFoundError('Could not find any running questions');
  }
  if (!Array.isArray(submittedQuestions)) {
    throw new BadRequestError('The request body is not an array');
  }
  if (submittedQuestions.length > 10) {
    throw new BadRequestError('You cannot submit more than 10 questions')
  }

  const results = [];
  const time = now - userQuestions.createdAt.getTime();
  let score = 0;

  // We loop all questions from DB, to prevent duplicate answers.
  userQuestions.questions.forEach((pokemonId) => {
    // We check if the question is present in the submitted answers
    const submittedQuestion = submittedQuestions.find((q) => pokemonId === q.pokemonId);

    const correctAnswer = pokemonRepository.getPokemonNameById(pokemonId);

    // If the question is not present in the answers, it is wrong
    if (!submittedQuestion) {
      results.push({
        pokemonId,
        answer: '',
        correctAnswer,
        correct: false,
      });
      return;
    }

    // If the question is correct, add 1 to score
    const { answer } = submittedQuestion;
    const isCorrect = pokemonRepository.validatePokemon(pokemonId, answer);
    if (isCorrect) {
      score += 1;
    }
    // Add to results with correctAnswer included
    results.push({
      pokemonId,
      answer,
      correctAnswer,
      correct: isCorrect,
    });
  });

  const { bestResult } = user;
  let highscore = false;

  // If the user does not have a score yet, we update it.
  if (!bestResult) {
    highscore = true;
    await userRepository.update(userId, {
      bestResult: {
        score,
        time,
      }
    });
  } else {
    // If the user has a score, we check it and update it if the score is better.
    const { score: oldScore, time: oldTime } = bestResult;
    if (score > oldScore || (score === oldScore && time < oldTime)) {
      highscore = true;
      await userRepository.update(userId, {
        bestResult: {
          score,
          time,
        }
      });
    }
  }

  // Since the score has been calculated, we clean up the userQuestions.
  await userQuestionsRepository.deleteByUserId(userId);

  ctx.body = {
    score,
    results,
    time,
    highscore,
  }
}

export default {
  requestQuestions,
  submitAnswers,
}