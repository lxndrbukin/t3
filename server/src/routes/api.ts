import express from 'express';

import authRouter from './auth/auth.router';
import tasksRouter from './tasks/tasks.router';
import categoriesRouter from './tasks/categories.router';

const api = express.Router();

api.use('/auth', authRouter);
api.use('/tasks', tasksRouter);
api.use('/categories', categoriesRouter);

export default api;
