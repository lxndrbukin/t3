import { Request, Response, NextFunction } from 'express';
import Todo from '../../models/todos.model';

const asyncHandler =
  (fn: any) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };

export const getAllTodos = async (req: Request, res: Response) => {
  try {
    const todos = await Todo.find();
    res.send(todos);
  } catch (error) {
    res.status(500).json({
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const createTodo = async (req: Request, res: Response) => {
  try {
    const { title, description } = req.body;
    const id = (await Todo.countDocuments()) + 1;
    const todo = new Todo({
      id,
      title,
      description,
    });
    await todo.save();
    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const updateTodo = asyncHandler(
  async (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params;
    const updatedTodo = await Todo.findOneAndUpdate(
      { id: Number(id) },
      req.body,
      {
        new: true,
        returnDocument: 'after',
      }
    );

    if (!updatedTodo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    res.json(updatedTodo);
  }
);

export const deleteTodo = asyncHandler(
  async (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params;
    const deletedTodo = await Todo.findOneAndDelete({ id: Number(id) });

    if (!deletedTodo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    res.json({ message: 'Todo deleted successfully' });
  }
);
