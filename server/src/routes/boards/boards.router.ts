import { Router, Request, Response, NextFunction } from "express";
import {
  getBoardsList,
  getBoard,
  createBoard,
  createColumn,
  deleteColumn,
  getTask,
  createTask,
} from "./boards.controller";

const boardsRouter: Router = Router();

boardsRouter.get("/", getBoardsList);
boardsRouter.post("/", createBoard);
boardsRouter.get("/:boardId", getBoard);
boardsRouter.post("/:boardId/columns", createColumn);
boardsRouter.delete("/:boardId/columns/:columnId", deleteColumn);
boardsRouter.post("/:boardId/columns/:columnId/tasks", createTask);
boardsRouter.get("/:boardId/columns/:columnId/tasks/:taskId", getTask);

export default boardsRouter;
