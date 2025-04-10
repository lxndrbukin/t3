import { Request, Response, NextFunction } from 'express';
import { TasksList } from '../../models/tasks.model';

import { ItemType, ErrorMessage } from './types';

const asyncHandler =
  (fn: any) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };

export const getList = async (req: Request, res: Response): Promise<void> => {
  try {
    const tasksList = await TasksList.findOne(
      {
        userId: (req.session as any).passport.user,
      },
      {
        'tasks.id': 1,
        'tasks.title': 1,
        'tasks.description': 1,
        'tasks.dueDate': 1,
        'categories.id': 1,
        'categories.name': 1,
      }
    ).select('-__v -_id -userId');
    if (!tasksList) {
      res.status(404).json({ message: ErrorMessage.TASKS_LIST_NOT_FOUND });
    } else {
      res.json(tasksList);
    }
  } catch (error) {
    res.status(500).json({
      message:
        error instanceof Error ? error.message : ErrorMessage.UNKNOWN_ERROR,
    });
  }
};

export const getItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const tasksList = await TasksList.findOne(
      {
        userId: (req.session as any).passport.user,
        tasks: { $elemMatch: { id: Number(req.params.id) } },
      },
      {
        'tasks.$': 1,
      }
    );
    if (!tasksList) {
      res.status(404).json({ message: ErrorMessage.TASK_NOT_FOUND });
    } else {
      res.json(tasksList.tasks[0]);
    }
  } catch (error) {
    res.status(500).json({
      message:
        error instanceof Error ? error.message : ErrorMessage.UNKNOWN_ERROR,
    });
  }
};

export const createItem = async (req: Request, res: Response) => {
  const userId = (req.session as any).passport?.user as string;
  let tasksList = await TasksList.findOne({
    userId,
  });
  switch (req.body.type as ItemType) {
    case ItemType.TASK:
      try {
        if (!tasksList) {
          tasksList = await TasksList.create({
            userId: (req.session as any).passport.user as string,
            tasks: [
              {
                id: 1,
                title: req.body.title,
                description: req.body.description,
                dueDate: req.body.dueDate,
              },
            ],
          });
        } else {
          tasksList = await TasksList.findOneAndUpdate(
            { userId },
            {
              $push: { tasks: { id: tasksList.tasks.length + 1, ...req.body } },
            }
          );
        }
        res.status(201).json(tasksList);
      } catch (error) {
        res.status(500).json({
          message:
            error instanceof Error ? error.message : ErrorMessage.UNKNOWN_ERROR,
        });
      }
      break;
    case ItemType.CATEGORY:
      try {
        const userId = req.params.userId;
        if (!tasksList) {
          tasksList = await TasksList.create({
            userId,
            categories: [{ id: 1, name: req.body.category }],
            tasks: [],
          });
        } else {
          const categoryExists = tasksList.categories.find(
            (category) => category.name === req.body.name
          );
          if (categoryExists) {
            res
              .status(400)
              .json({ message: ErrorMessage.CATEGORY_ALREADY_EXISTS });
            return;
          }
          tasksList = await TasksList.findOneAndUpdate(
            { userId },
            {
              $push: {
                categories: {
                  id: (tasksList?.categories?.length || 0) + 1,
                  name: req.body.category,
                },
              },
            },
            { new: true, runValidators: true }
          );
          res.json(tasksList);
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: ErrorMessage.INTERNAL_SERVER_ERROR });
      }
      break;
  }
};

export const updateItem = asyncHandler(
  async (req: Request<{ id: string }>, res: Response) => {
    const userId = (req.session as any).passport?.user as string;
    let tasksList = await TasksList.findOne({
      userId,
    });
    switch (req.body.type as ItemType) {
      case ItemType.TASK:
        if (!tasksList) {
          return res
            .status(404)
            .json({ message: ErrorMessage.TASKS_LIST_NOT_FOUND });
        }
        const taskIndex = tasksList.tasks.findIndex(
          (task) => String(task.id) === req.params.id
        );
        if (taskIndex === -1) {
          return res.status(404).json({ message: ErrorMessage.TASK_NOT_FOUND });
        } else {
          tasksList.tasks[taskIndex] = {
            ...tasksList.tasks[taskIndex],
            ...req.body,
          };
          await tasksList.save();
          res.json(tasksList);
        }
        break;
      case ItemType.CATEGORY:
        tasksList = await TasksList.findOneAndUpdate(
          { userId },
          { $set: { [`categories.${req.params.id}`]: req.body } }
        );
        if (!tasksList) {
          res
            .status(404)
            .json({ message: ErrorMessage.TASK_CATEGORIES_NOT_FOUND });
        } else {
          res.json(tasksList);
        }
        break;
    }
  }
);

export const deleteItem = asyncHandler(
  async (req: Request<{ id: string }>, res: Response) => {
    const userId = (req.session as any).passport?.user as string;
    let tasksList = await TasksList.findOne({ userId });
    switch (req.body.type as ItemType) {
      case ItemType.TASK:
        if (!tasksList) {
          return res
            .status(404)
            .json({ message: ErrorMessage.TASKS_LIST_NOT_FOUND });
        }
        const taskIndex = tasksList.tasks.findIndex(
          (task) => String(task.id) === req.params.id
        );
        if (taskIndex === -1) {
          return res.status(404).json({ message: ErrorMessage.TASK_NOT_FOUND });
        } else {
          tasksList.tasks.splice(taskIndex, 1);
          await tasksList.save();
          res.json(tasksList);
        }
        break;
      case ItemType.CATEGORY:
        tasksList = await TasksList.findOneAndUpdate(
          { userId },
          { $unset: { [`categories.${req.params.id}`]: '' } }
        );
        if (!tasksList) {
          res
            .status(404)
            .json({ message: ErrorMessage.TASK_CATEGORIES_NOT_FOUND });
        } else {
          res.json(tasksList);
        }
        break;
    }
  }
);
