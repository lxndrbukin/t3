import { Router, Request, Response, NextFunction } from "express";
import {
  getBoardsList,
  getBoard,
  createBoard,
  createColumn,
  deleteColumn,
  createTask,
} from "./boards.controller";

const boardsRouter: Router = Router();

const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.params;
  if (
    (req.session as any).passport &&
    (req.session as any).passport.user === Number(userId)
  ) {
    return next();
  } else {
    res.status(401).json({ message: "Access unauthorized" });
  }
};

boardsRouter.get("/", isAuthenticated, getBoardsList);
boardsRouter.get("/:boardId", isAuthenticated, getBoard);
boardsRouter.post("/", isAuthenticated, createBoard);
boardsRouter.post("/:boardId/columns", isAuthenticated, createColumn);
boardsRouter.delete(
  "/:boardId/columns/:columnId",
  isAuthenticated,
  deleteColumn
);
boardsRouter.post(
  "/:boardId/columns/:columnId/tasks",
  isAuthenticated,
  createTask
);

export default boardsRouter;
