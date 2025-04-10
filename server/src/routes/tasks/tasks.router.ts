import { Router, Request, Response, NextFunction } from 'express';
import {
  getList,
  getItem,
  createItem,
  updateItem,
  deleteItem,
} from './tasks.controller';

const tasksRouter: Router = Router();

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

tasksRouter.get('/:userId', isAuthenticated, getList);
tasksRouter.post('/:userId', isAuthenticated, createItem);
tasksRouter.get('/:userId/:id', isAuthenticated, getItem);
tasksRouter.put('/:userId/:id', isAuthenticated, updateItem);
tasksRouter.delete('/:userId/:id', isAuthenticated, deleteItem);

export default tasksRouter;
