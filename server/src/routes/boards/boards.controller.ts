import { Request, Response, NextFunction } from 'express';
import { TasksBoard } from '../../models/board.model';

import { ErrorMessage } from './types';
import { boardColumns } from './assets';

const asyncHandler =
  (fn: any) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };

export const createBoard = async (req: Request, res: Response) => {
  const { boardName, description, columns } = req.body;
  const boardId = await TasksBoard.countDocuments({
    owner: (req.session as any).passport.user,
  });
  try {
    const tasksBoard = await TasksBoard.create({
      id: boardId + 1,
      owner: (req.session as any).passport.user,
      boardName,
      description,
      columns: boardColumns(columns),
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
    const tasksBoard = await TasksBoard.findOne({
      owner: (req.session as any).passport.user,
    }).lean();
    if (!tasksBoard) {
      return res
        .status(404)
        .json({ message: ErrorMessage.TASKS_LIST_NOT_FOUND });
    }
    const filteredBoard = {
      ...tasksBoard,
      columns: tasksBoard.columns.map((col: any) => ({
        name: col.name,
        order: col.order,
        tasks: col.tasks.map((task: any) => ({
          id: task.id,
          title: task.title,
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

export const getItem = asyncHandler(async (req: Request, res: Response) => {
  try {
    const board = await TasksBoard.findOne({
      userId: (req.session as any).passport.user,
    }).lean();

    if (!board) {
      return res.status(404).json({ message: ErrorMessage.TASK_NOT_FOUND });
    }

    const taskId = Number(req.params.id);
    let foundTask = null;

    for (const column of board.columns) {
      foundTask = column.tasks.find((task: any) => task.id === taskId);
      if (foundTask) break;
    }

    if (!foundTask) {
      res.status(404).json({ message: ErrorMessage.TASK_NOT_FOUND });
    } else {
      res.json(foundTask);
    }
  } catch (error) {
    res.status(500).json({
      message:
        error instanceof Error ? error.message : ErrorMessage.UNKNOWN_ERROR,
    });
  }
});

export const createItem = asyncHandler(async (req: Request, res: Response) => {
  const userId = (req.session as any).passport?.user as string;

  try {
    let board = await TasksBoard.findOne({ userId });

    if (!board) {
      board = await TasksBoard.create({
        userId,
        columns: [
          {
            name: 'To Do',
            order: 0,
            tasks: [
              {
                id: 1,
                title: req.body.title,
                description: req.body.description,
                completed: false,
                createdAt: new Date(),
                dueDate: req.body.dueDate,
              },
            ],
          },
          { name: 'In Progress', order: 1, tasks: [] },
          { name: 'Done', order: 2, tasks: [] },
        ],
      });

      return res.status(201).json({ message: 'Task created', board });
    }

    const sortedColumns = [...board.columns].sort((a, b) => a.order - b.order);
    const targetColumn = sortedColumns[0];

    const allTasks = board.columns.flatMap((col) => col.tasks);
    const maxId =
      allTasks.length > 0 ? Math.max(...allTasks.map((task) => task.id)) : 0;

    const newTask = {
      id: maxId + 1,
      title: req.body.title,
      description: req.body.description,
      completed: false,
      createdAt: new Date(),
      dueDate: req.body.dueDate,
    };

    targetColumn.tasks.push(newTask);
    await board.save();

    res.status(201).json({ message: 'Task created', task: newTask });
  } catch (error) {
    res.status(500).json({
      message:
        error instanceof Error ? error.message : ErrorMessage.UNKNOWN_ERROR,
    });
  }
});

export const updateItem = asyncHandler(
  async (req: Request<{ id: string }>, res: Response) => {
    const userId = (req.session as any).passport?.user as string;

    try {
      const board = await TasksBoard.findOne({ userId });

      if (!board) {
        return res
          .status(404)
          .json({ message: ErrorMessage.TASKS_LIST_NOT_FOUND });
      }

      const taskId = Number(req.params.id);
      let updatedTask = null;

      for (const column of board.columns) {
        const task = column.tasks.find((t) => t.id === taskId);
        if (task) {
          Object.assign(task, {
            title: req.body.title ?? task.title,
            description: req.body.description ?? task.description,
            dueDate: req.body.dueDate ?? task.dueDate,
            completed: req.body.completed ?? task.completed,
          });
          updatedTask = task;
          break;
        }
      }

      if (!updatedTask) {
        return res.status(404).json({ message: ErrorMessage.TASK_NOT_FOUND });
      }

      await board.save();
      return res
        .status(200)
        .json({ message: 'Task updated', task: updatedTask });
    } catch (error) {
      res.status(500).json({
        message:
          error instanceof Error ? error.message : ErrorMessage.UNKNOWN_ERROR,
      });
    }
  }
);

export const deleteItem = asyncHandler(
  async (req: Request<{ id: string }>, res: Response) => {
    const userId = (req.session as any).passport?.user as string;

    try {
      const board = await TasksBoard.findOne({ userId });

      if (!board) {
        return res
          .status(404)
          .json({ message: ErrorMessage.TASKS_LIST_NOT_FOUND });
      }

      const taskId = Number(req.params.id);
      let taskDeleted = false;

      for (const column of board.columns) {
        const index = column.tasks.findIndex((task) => task.id === taskId);
        if (index !== -1) {
          column.tasks.splice(index, 1);
          taskDeleted = true;
          break;
        }
      }

      if (!taskDeleted) {
        return res.status(404).json({ message: ErrorMessage.TASK_NOT_FOUND });
      }

      await board.save();
      return res.json({ message: 'Task deleted successfully' });
    } catch (error) {
      res.status(500).json({
        message:
          error instanceof Error ? error.message : ErrorMessage.UNKNOWN_ERROR,
      });
    }
  }
);
