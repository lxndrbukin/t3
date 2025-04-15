import express from 'express';

import authRouter from './auth/auth.router';
import boardsRouter from './boards/boards.router';

const api = express.Router();

api.use('/auth', authRouter);
api.use('/boards', boardsRouter);

export default api;
