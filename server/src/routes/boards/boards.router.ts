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

boardsRouter.get("/", getBoardsList);
boardsRouter.get("/:boardId", getBoard);
boardsRouter.post("/", createBoard);
boardsRouter.post("/:boardId/columns", createColumn);
boardsRouter.delete(
  "/:boardId/columns/:columnId",

  deleteColumn
);
boardsRouter.post(
  "/:boardId/columns/:columnId/tasks",

  createTask
);

export default boardsRouter;
