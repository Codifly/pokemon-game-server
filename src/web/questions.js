import Router from '@koa/router';

import questionsService from '../services/questions.js';
import authorized from '../utils/authorized.js';

const router = new Router();

router.get('/questions', authorized, questionsService.requestQuestions);
router.post('/questions', authorized, questionsService.submitAnswers);

export default router.routes();