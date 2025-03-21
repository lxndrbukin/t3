import { Request, Response, NextFunction } from 'express';
import { TasksList, TaskCategories } from '../../models/tasks.model';

const asyncHandler =
  (fn: any) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };

export const getAllTasksCategories = async (req: Request, res: Response) => {
  const taskCategoriesList = await TaskCategories.findOne({
    userId: (req.session as any).passport.user,
  }).select('-__v -_id -userId');
  if (!taskCategoriesList) {
    res.status(404).json({ message: 'Task categories list not found' });
  } else {
    res.json(taskCategoriesList.categories);
  }
};

export const createTasksCategory = async (req: Request, res: Response) => {
  let taskCategoriesList = await TaskCategories.findOneAndUpdate(
    { userId: (req.session as any).passport.user },
    { $push: { categories: req.body } }
  )
    .select('-__v -_id -userId')
    .lean();
  if (!taskCategoriesList) {
    taskCategoriesList = await TaskCategories.create({
      userId: (req.session as any).passport.user,
      categories: [req.body],
    });
  }
  const categoryExists = taskCategoriesList.categories.find(
    (category) => category.name === req.body.name
  );
  if (categoryExists) {
    return res.status(400).json({ message: 'Category already exists' });
  }
  res.json(taskCategoriesList);
};

export const updateTaskCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const taskCategoriesList = await TaskCategories.findOneAndUpdate(
      { userId: (req.session as any).passport.user },
      { $set: { 'categories.$[category]': req.body } },
      { arrayFilters: [{ 'category._id': req.params.id }] }
    )
      .select('-__v -_id -userId')
      .lean();
    if (!taskCategoriesList) {
      res.status(404).json({ message: 'Task categories list not found' });
    } else {
      res.json(taskCategoriesList);
    }
  } catch (error) {
    res.status(500).json({
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const deleteTaskCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const taskCategoriesList = await TaskCategories.findOneAndUpdate(
      { userId: (req.session as any).passport.user },
      { $pull: { categories: { _id: req.params.id } } }
    )
      .select('-__v -_id -userId')
      .lean();
    if (!taskCategoriesList) {
      res.status(404).json({ message: 'Task categories list not found' });
    } else {
      res.json(taskCategoriesList);
    }
  } catch (error) {
    res.status(500).json({
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const getAllTasks = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const tasksList = await TasksList.findOne({
      userId: (req.session as any).passport.user,
    }).select('-__v -_id -userId');
    if (!tasksList) {
      res.status(404).json({ message: 'Tasks list not found' });
    } else {
      res.json(tasksList.tasks);
    }
  } catch (error) {
    res.status(500).json({
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const createTask = async (req: Request, res: Response) => {
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
        { $push: { tasks: { id: tasksList.tasks.length + 1, ...req.body } } }
      );
    }
    res.status(201).json(tasksList);
  } catch (error) {
    res.status(500).json({
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const updateTask = asyncHandler(
  async (req: Request<{ id: string }>, res: Response) => {
    try {
      const userId = (req.session as any).passport?.user as string;
      if (!userId) {
        return res.status(401).json({ message: 'Unauthorized, please log in' });
      }

      let tasksList = await TasksList.findOne({ userId });

      if (!tasksList) {
        return res.status(404).json({ message: 'Tasks list not found' });
      }

      let task = tasksList.tasks.find(
        (task) => String(task.id) === req.params.id
      );

      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
      Object.assign(task, req.body);

      await tasksList.save();

      res.json({ message: 'Task updated successfully', task });
    } catch (error) {
      res.status(500).json({
        message: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }
);

export const deleteTask = asyncHandler(
  async (req: Request<{ id: string }>, res: Response) => {
    const userId = (req.session as any).passport?.user as string;
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized, please log in' });
    }

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
    }

    await tasksList.save();

    res.json({ message: 'Task deleted successfully' });
  }
);
