import { Request, Response, NextFunction } from 'express';
import TodoList from '../../models/todos.model';

const asyncHandler =
  (fn: any) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };

export const getAllTodos = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const todosList = await TodoList.findOne({
      userId: (req.session as any).passport.user,
    }).select('-__v -_id -userId');
    if (!todosList) {
      res.status(404).json({ message: 'Todo list not found' });
    } else {
      res.json(todosList.todos);
    }
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

export const updateTodoForm = (req: Request, res: Response) => {
  res.send(`
    <form method="PUT" action="/v1/todos/${req.params.id}">
      <input type="text" name="title" placeholder="Title" />
      <input type="text" name="description" placeholder="Description" />
      <button type="submit">Update Todo</button>
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
    try {
      const userId = (req.session as any).passport?.user as string;
      if (!userId) {
        return res.status(401).json({ message: 'Unauthorized, please log in' });
      }

      let todosList = await TodoList.findOne({ userId });

      if (!todosList) {
        return res.status(404).json({ message: 'Todo list not found' });
      }

      let todo = todosList.todos.find(
        (todo) => String(todo.id) === req.params.id
      );

      if (!todo) {
        return res.status(404).json({ message: 'Todo not found' });
      }
      Object.assign(todo, req.body);

      await todosList.save();

      res.json({ message: 'Todo updated successfully', todo });
    } catch (error) {
      res.status(500).json({
        message: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }
);

export const deleteTodo = asyncHandler(
  async (req: Request<{ id: string }>, res: Response) => {
    const userId = (req.session as any).passport?.user as string;
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized, please log in' });
    }

    const todosList = await TodoList.findOne({ userId });
    if (!todosList) {
      return res.status(404).json({ message: 'Todo list not found' });
    }

    const todoIndex = todosList.todos.findIndex(
      (todo) => String(todo.id) === req.params.id
    );
    if (todoIndex === -1) {
      return res.status(404).json({ message: 'Todo not found' });
    } else {
      todosList.todos.splice(todoIndex, 1);
    }

    await todosList.save();

    res.json({ message: 'Todo deleted successfully' });
  }
);
