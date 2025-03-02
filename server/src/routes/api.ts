import express from 'express';

import authRouter from './auth/auth.router';
import todosRouter from './todos/todos.router';

const api = express.Router();

api.use('/auth', authRouter);
api.use('/todos', todosRouter);

export default api;
