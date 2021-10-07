import Router from '@koa/router';

import leaderboardService from '../services/leaderboard.js';

const router = new Router();

router.get('/leaderboard', leaderboardService.getLeaderboard);

export default router.routes();