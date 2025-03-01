import { Router } from 'express';
import {
  getAllTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  createTodoForm,
} from './todos.controller';

const router: Router = Router();

router.get('/', getAllTodos);
router.get('/create', createTodoForm);
router.post('/', createTodo);
router.put('/:id', updateTodo);
router.delete('/:id', deleteTodo);

export default router;
