import { Router, Request, Response, NextFunction } from 'express';
import {
  getBoardsList,
  getBoard,
  createBoard,
  createColumn,
  deleteColumn,
} from './boards.controller';

const boardsRouter: Router = Router();

const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.params;
  if (
    (req.session as any).passport &&
    (req.session as any).passport.user === Number(userId)
  ) {
    return next();
  } else {
    res.status(401).json({ message: 'Access unauthorized' });
  }
};

boardsRouter.get('/:userId', isAuthenticated, getBoardsList);
boardsRouter.get('/:userId/:boardId', isAuthenticated, getBoard);
boardsRouter.post('/:userId', isAuthenticated, createBoard);
boardsRouter.post('/:userId/:boardId/columns', isAuthenticated, createColumn);
boardsRouter.delete(
  '/:userId/:boardId/columns/:columnId',
  isAuthenticated,
  deleteColumn
);

export default boardsRouter;
