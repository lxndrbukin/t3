import { Router, Request, Response, NextFunction } from 'express';

import {
  getAllTasksCategories,
  createTasksCategory,
  updateTasksCategory,
  deleteTasksCategory,
} from './categories.controller';

const router: Router = Router();

router.get('/:userId', getAllTasksCategories);
router.post('/:userId', createTasksCategory);
router.put('/:userId/:id', updateTasksCategory);
router.delete('/:userId/:id', deleteTasksCategory);

export default router;
