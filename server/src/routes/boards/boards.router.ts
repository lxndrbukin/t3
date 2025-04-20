import { Router, Request, Response, NextFunction } from 'express';
import {
  getBoard,
  createBoard,
  getItem,
  createItem,
  updateItem,
  deleteItem,
} from './boards.controller';

const boardsRouter: Router = Router();

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

boardsRouter.get('/:userId', isAuthenticated, getBoard);
boardsRouter.post('/:userId', isAuthenticated, createBoard);
// boardsRouter.post('/:userId', isAuthenticated, createItem);
boardsRouter.get('/:userId/:id', isAuthenticated, getItem);
boardsRouter.put('/:userId/:id', isAuthenticated, updateItem);
boardsRouter.delete('/:userId/:id', isAuthenticated, deleteItem);

export default boardsRouter;
