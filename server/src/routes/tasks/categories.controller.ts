import { Request, Response } from 'express';
import { TaskCategories } from '../../models/categories.model';

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

export const createTasksCategory = async (
  req: Request<{ userId: string }>,
  res: Response
): Promise<void> => {
  try {
    const userId = req.params.userId;
    let taskCategoriesList = await TaskCategories.findOne({ userId })
      .select('-__v -_id -userId')
      .lean();

    if (!taskCategoriesList) {
      taskCategoriesList = await TaskCategories.create({
        userId,
        categories: [{ id: 1, name: req.body.category }],
      });
    } else {
      const categoryExists = taskCategoriesList.categories.find(
        (category) => category.name === req.body.name
      );

      if (categoryExists) {
        res.status(400).json({ message: 'Category already exists' });
        return;
      }

      taskCategoriesList = await TaskCategories.findOneAndUpdate(
        { userId },
        {
          $push: {
            categories: {
              id: (taskCategoriesList?.categories?.length || 0) + 1,
              name: req.body.category,
            },
          },
        },
        { new: true, runValidators: true }
      );
    }
    res.json(taskCategoriesList);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateTasksCategory = async (
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

export const deleteTasksCategory = async (
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
