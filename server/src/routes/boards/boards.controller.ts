import { Request, Response, NextFunction } from "express";
import { TasksBoard } from "../../models/board.model";

import { ErrorMessage } from "./types";
import { boardColumns } from "./assets";

const asyncHandler =
  (fn: any) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };

export const createBoard = async (req: Request, res: Response) => {
  const { boardName, description, columns, key } = req.body;
  const boardId = await TasksBoard.countDocuments({
    owner: (req.session as any).passport.user,
  });
  try {
    const tasksBoard = await TasksBoard.create({
      id: boardId + 1,
      owner: (req.session as any).passport.user,
      boardName,
      key: key.toUpperCase(),
      description,
      columns: boardColumns(columns),
      members: [
        {
          userId: (req.session as any).passport.user,
        },
      ],
    });
    res.status(201).json(tasksBoard);
  } catch (error) {
    res.status(500).json({
      message:
        error instanceof Error ? error.message : ErrorMessage.UNKNOWN_ERROR,
    });
  }
};

export const getBoardsList = async (req: Request, res: Response) => {
  try {
    const tasksBoards = await TasksBoard.find(
      {
        owner: (req.session as any).passport.user,
      },
      { boardName: 1, id: 1, description: 1, createdAt: 1, _id: 0 }
    );
    res.json(tasksBoards);
  } catch (error) {
    res.status(500).json({
      message:
        error instanceof Error ? error.message : ErrorMessage.UNKNOWN_ERROR,
    });
  }
};

export const getBoard = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { boardId } = req.params;
    const tasksBoard = await TasksBoard.findOne({
      owner: (req.session as any).passport.user,
      id: boardId,
    }).lean();
    if (!tasksBoard) {
      return res
        .status(404)
        .json({ message: ErrorMessage.TASKS_LIST_NOT_FOUND });
    }
    const filteredBoard = {
      ...tasksBoard,
      columns: tasksBoard.columns.map((col: any) => ({
        id: col.id,
        name: col.name,
        order: col.order,
        tasks: col.tasks.map((task: any) => ({
          id: task.id,
          title: task.title,
          key: task.key,
          owner: task.owner,
          assignedTo: task.assignedTo,
          description: task.description,
          completed: task.completed,
          dueDate: task.dueDate,
        })),
      })),
    };
    res.json(filteredBoard);
  } catch (error) {
    res.status(500).json({
      message:
        error instanceof Error ? error.message : ErrorMessage.UNKNOWN_ERROR,
    });
  }
});

export const deleteBoard = async (req: Request, res: Response) => {
  const { boardId } = req.params;
  try {
    await TasksBoard.deleteOne({
      owner: (req.session as any).passport.user,
      id: boardId,
    });
    res.status(204).json();
  } catch (error) {
    res.status(500).json({
      message:
        error instanceof Error ? error.message : ErrorMessage.UNKNOWN_ERROR,
    });
  }
};

export const updateBoard = async (req: Request, res: Response) => {
  const { boardName, description, columns } = req.body;
  const { boardId } = req.params;
  try {
    await TasksBoard.updateOne(
      {
        owner: (req.session as any).passport.user,
        id: boardId,
      },
      {
        $set: {
          boardName,
          description,
          columns: boardColumns(columns),
        },
      }
    );
    res.status(204).json();
  } catch (error) {
    res.status(500).json({
      message:
        error instanceof Error ? error.message : ErrorMessage.UNKNOWN_ERROR,
    });
  }
};

export const createColumn = asyncHandler(
  async (req: Request, res: Response) => {
    const { columnName } = req.body;
    const { boardId } = req.params;
    try {
      const currentBoard = await TasksBoard.findOne({
        owner: (req.session as any).passport.user,
        id: boardId,
      }).lean();
      const columnOrder = currentBoard!.columns.length;
      if (!currentBoard) {
        return res.status(404).json({ message: "Board not found" });
      }
      const updatedBoard = await TasksBoard.findOneAndUpdate(
        {
          owner: (req.session as any).passport.user,
          id: boardId,
        },
        {
          $push: {
            columns: {
              id: columnOrder + 1,
              name: columnName,
              order: columnOrder,
              tasks: [],
            },
          },
        },
        { new: true, lean: true }
      );

      if (!updatedBoard) {
        return res
          .status(404)
          .json({ message: "Board not found after update" });
      }

      res
        .status(201)
        .json(updatedBoard.columns[updatedBoard.columns.length - 1]);
    } catch (error) {
      res.status(500).json({
        message:
          error instanceof Error ? error.message : "Unknown error occurred",
      });
    }
  }
);

export const deleteColumn = async (req: Request, res: Response) => {
  const { columnId } = req.params;
  try {
    await TasksBoard.updateOne(
      { owner: (req.session as any).passport.user },
      { $pull: { columns: { id: columnId } } }
    );
    res.status(204).json();
  } catch (error) {
    res.status(500).json({
      message:
        error instanceof Error ? error.message : ErrorMessage.UNKNOWN_ERROR,
    });
  }
};

export const updateColumn = async (req: Request, res: Response) => {
  const { columnName, columnId } = req.body;
  try {
    await TasksBoard.updateOne(
      { owner: (req.session as any).passport.user },
      { $set: { [`columns.$[columnIndex].name`]: columnName } },
      { arrayFilters: [{ columnIndex: { $eq: columnId } }] }
    );
    res.status(204).json();
  } catch (error) {
    res.status(500).json({
      message:
        error instanceof Error ? error.message : ErrorMessage.UNKNOWN_ERROR,
    });
  }
};

export const getTask = asyncHandler(async (req: Request, res: Response) => {
  const { taskId } = req.params;
  try {
    const board = await TasksBoard.findOne({
      owner: (req.session as any).passport.user,
      id: Number(req.params.boardId),
    }).lean();
    if (!board) {
      return res.status(404).json({ message: ErrorMessage.BOARD_NOT_FOUND });
    }
    const filteredTask = {
      ...board,
      columns: board.columns.map((col: any) => ({
        id: col.id,
        name: col.name,
        order: col.order,
        tasks: col.tasks.map((task: any) => ({
          id: task.id,
          title: task.title,
          key: task.key,
          owner: task.owner,
          assignedTo: task.assignedTo,
          description: task.description,
          completed: task.completed,
          dueDate: task.dueDate,
        })),
      })),
    };
    const task = filteredTask.columns
      .find((col: any) => col.id === Number(req.params.columnId))!
      .tasks.find((task: any) => task.id === Number(taskId));
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({
      message:
        error instanceof Error ? error.message : ErrorMessage.UNKNOWN_ERROR,
    });
  }
});

export const createTask = asyncHandler(async (req: Request, res: Response) => {
  const { title, dueDate, description } = req.body;
  const boardId = Number(req.params.boardId);
  const columnId = Number(req.params.columnId);
  let currentBoard = await TasksBoard.findOne({
    owner: (req.session as any).passport.user,
    id: boardId,
  });
  const totalTasks = currentBoard?.columns.reduce(
    (acc, col) => acc + col.tasks.length,
    0
  );
  if (!currentBoard) {
    return res.status(404).json({ message: ErrorMessage.BOARD_NOT_FOUND });
  }
  if (!currentBoard.columns[columnId - 1]) {
    return res.status(404).json({ message: ErrorMessage.COLUMN_NOT_FOUND });
  }
  const taskId = totalTasks ? totalTasks + 1 : 1;
  try {
    currentBoard.columns[columnId - 1].tasks.push({
      id: taskId,
      title,
      key: `${currentBoard.key.toUpperCase()}-${taskId}`,
      owner: (req.session as any).passport.user,
      description,
      dueDate,
      completed: false,
    });
    await currentBoard.save();
    res.status(204).json({
      ...currentBoard.columns[columnId - 1].tasks[taskId - 1],
      columnId,
    });
  } catch (error) {
    res.status(500).json({
      message:
        error instanceof Error ? error.message : ErrorMessage.UNKNOWN_ERROR,
    });
  }
});
