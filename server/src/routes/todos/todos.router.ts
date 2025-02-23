import { Router } from 'express';
import {
  getAllTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} from './todos.controller';

const router: Router = Router();

router.get('/', getAllTodos);
router.post('/', createTodo);
router.put('/:id', updateTodo);
router.delete('/:id', deleteTodo);

export default router;
