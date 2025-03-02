import { Router, Request, Response, NextFunction } from 'express';
import {
  getAllTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  createTodoForm,
} from './todos.controller';

const router: Router = Router();

const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.params;
  if (
    (req.session as any).passport &&
    (req.session as any).passport.user === userId
  ) {
    return next();
  } else {
    res.status(401).json({ message: 'Access unauthorized' });
  }
};

router.get('/:userId', isAuthenticated, getAllTodos);
router.get('/:userId/create-form', isAuthenticated, createTodoForm);
router.post('/:userId/create', isAuthenticated, createTodo);
router.put('/:userId/:id', isAuthenticated, updateTodo);
router.delete('/:userId/:id', isAuthenticated, deleteTodo);

export default router;
