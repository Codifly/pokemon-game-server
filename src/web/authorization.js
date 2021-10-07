import Router from '@koa/router';

import authorizationService from '../services/authorization.js';

const router = new Router();

router.post('/login', authorizationService.login);

export default router.routes();