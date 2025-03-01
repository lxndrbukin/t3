import { Request, Response, NextFunction } from 'express';
import TodoList from '../../models/todos.model';

const asyncHandler =
  (fn: any) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };

export const getAllTodos = async (req: Request, res: Response) => {
  try {
    const todosList = await TodoList.findOne({
      userId: (req.session as any).passport.user,
    });
    res.send(todosList);
  } catch (error) {
    res.status(500).json({
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const createTodoForm = (req: Request, res: Response) => {
  res.send(`
    <form method="POST" action="/v1/todos">
      <input type="text" name="title" placeholder="Title" />
      <input type="text" name="description" placeholder="Description" />
      <button type="submit">Create Todo</button>
    </form>
  `);
};

export const createTodo = async (req: Request, res: Response) => {
  try {
    let todosList = await TodoList.findOne({
      userId: (req.session as any).passport.user as string,
    });
    if (!todosList) {
      todosList = await TodoList.create({
        userId: (req.session as any).passport.user as string,
        todos: [
          {
            id: 1,
            title: req.body.title,
            description: req.body.description,
          },
        ],
      });
    } else {
      todosList = await TodoList.findOneAndUpdate(
        { userId: (req.session as any).passport.user },
        { $push: { todos: { id: todosList.todos.length + 1, ...req.body } } }
      );
    }
    res.status(201).json(todosList);
  } catch (error) {
    res.status(500).json({
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const updateTodo = asyncHandler(
  async (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params;
    const updatedTodo = await TodoList.findOneAndUpdate(
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
    const deletedTodo = await TodoList.findOneAndDelete({ id: Number(id) });

    if (!deletedTodo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    res.json({ message: 'Todo deleted successfully' });
  }
);
