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
    return res.redirect('/');
  }
};

router.get('/:userId', isAuthenticated, getAllTodos);
router.get('/create', createTodoForm);
router.post('/:userId', createTodo);
router.put('/:userId/:id', updateTodo);
router.delete('/:userId/:id', deleteTodo);

export default router;
