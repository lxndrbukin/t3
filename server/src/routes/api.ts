import express from 'express';

import authRouter from './auth/auth.router';
import tasksRouter from './tasks/tasks.router';

const api = express.Router();

api.use('/auth', authRouter);
api.use('/tasks', tasksRouter);

export default api;
