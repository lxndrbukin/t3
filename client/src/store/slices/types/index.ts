export type SessionProps = {
  isLoggedIn: boolean;
  user:
    | {
        googleId: string;
        name: string;
        email: string;
      }
    | undefined;
};

export type TasksProps = {
  list: TaskProps[];
  currentTask: TaskProps | null;
  categories: string[];
};

export type TaskProps = {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
  dueDate: string;
};

export type BoardProps = {
  id: number;
  owner: number;
  boardName: string;
  columns: {
    id: number;
    name: string;
    order: number;
    tasks: {
      id: number;
      title: string;
      description: string;
      category: string;
      completed: boolean;
      createdAt: string;
      dueDate: string;
    }[];
  }[];
};

export type BoardListItemProps = {
  id: number;
  name: string;
  description: string;
  createdAt: string;
};

export type BoardsProps = {
  list: BoardListItemProps[];
  currentBoard: BoardProps | null;
};
