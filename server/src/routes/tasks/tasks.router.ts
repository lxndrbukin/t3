import { Router, Request, Response, NextFunction } from 'express';
import {
  getAllTasks,
  createTasksForm,
  createTask,
  updateTask,
  deleteTask,
} from './tasks.controller';

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

router.get('/:userId', isAuthenticated, getAllTasks);
router.get('/:userId/create-form', isAuthenticated, createTasksForm);
router.post('/:userId/create', isAuthenticated, createTask);
router.put('/:userId/:id', isAuthenticated, updateTask);
router.delete('/:userId/:id', isAuthenticated, deleteTask);

export default router;
