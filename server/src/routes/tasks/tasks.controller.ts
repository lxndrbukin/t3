import { Request, Response, NextFunction } from 'express';
import { TasksList } from '../../models/tasks.model';

enum ItemType {
  TASK = 'task',
  CATEGORY = 'category',
}

const asyncHandler =
  (fn: any) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };

export const getList = async (req: Request, res: Response): Promise<void> => {
  try {
    const tasksList = await TasksList.findOne({
      userId: (req.session as any).passport.user,
    }).select('-__v -_id -userId');
    if (!tasksList) {
      res.status(404).json({ message: 'Tasks list not found' });
    } else {
      res.json(tasksList);
    }
  } catch (error) {
    res.status(500).json({
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const createItem = async (req: Request, res: Response) => {
  switch (req.body.type as ItemType) {
    case ItemType.TASK:
      try {
        let tasksList = await TasksList.findOne({
          userId: (req.session as any).passport.user as string,
        });
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
            { userId: (req.session as any).passport.user },
            {
              $push: { tasks: { id: tasksList.tasks.length + 1, ...req.body } },
            }
          );
        }
        res.status(201).json(tasksList);
      } catch (error) {
        res.status(500).json({
          message: error instanceof Error ? error.message : 'Unknown error',
        });
      }
      break;
    case ItemType.CATEGORY:
      try {
        const userId = req.params.userId;
        let tasksList = await TasksList.findOne({ userId })
          .select('-__v -_id -userId')
          .lean();

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
            res.status(400).json({ message: 'Category already exists' });
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
        res.status(500).json({ message: 'Internal server error' });
      }
      break;
  }
};

export const updateItem = asyncHandler(
  async (req: Request<{ id: string }>, res: Response) => {
    const userId = (req.session as any).passport?.user as string;
    switch (req.body.type as ItemType) {
      case ItemType.TASK:
        const tasksList = await TasksList.findOne({
          userId,
        });
        if (!tasksList) {
          return res.status(404).json({ message: 'Tasks list not found' });
        }

        const taskIndex = tasksList.tasks.findIndex(
          (task) => String(task.id) === req.params.id
        );
        if (taskIndex === -1) {
          return res.status(404).json({ message: 'Task not found' });
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
        const taskCategoriesList = await TasksList.findOneAndUpdate(
          { userId },
          { $set: { 'categories.$[category]': req.body } },
          { arrayFilters: [{ 'category.id': req.params.id }] }
        )
          .select('-__v -_id -userId')
          .lean();
        if (!taskCategoriesList) {
          res.status(404).json({ message: 'Task categories list not found' });
        } else {
          res.json(taskCategoriesList);
        }
        break;
    }
  }
);

export const deleteItem = asyncHandler(
  async (req: Request<{ id: string }>, res: Response) => {
    const userId = (req.session as any).passport?.user as string;
    switch (req.body.type as ItemType) {
      case ItemType.TASK:
        const tasksList = await TasksList.findOne({ userId });
        if (!tasksList) {
          return res.status(404).json({ message: 'Tasks list not found' });
        }

        const taskIndex = tasksList.tasks.findIndex(
          (task) => String(task.id) === req.params.id
        );
        if (taskIndex === -1) {
          return res.status(404).json({ message: 'Task not found' });
        } else {
          tasksList.tasks.splice(taskIndex, 1);
          await tasksList.save();
          res.json(tasksList);
        }
        break;
      case ItemType.CATEGORY:
        const taskCategoriesList = await TasksList.findOneAndUpdate(
          { userId },
          { $pull: { categories: { id: req.params.id } } }
        )
          .select('-__v -_id -userId')
          .lean();
        if (!taskCategoriesList) {
          res.status(404).json({ message: 'Task categories list not found' });
        } else {
          res.json(taskCategoriesList);
        }
        break;
    }
  }
);
