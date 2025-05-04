export type SessionProps = {
  isLoggedIn: boolean;
  user:
    | {
        userId: number;
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

export type TaskUser = {
  userId: number;
  name: string;
  email: string;
};

export type TaskProps = {
  id: number;
  title: string;
  description: string;
  key: string;
  owner: TaskUser;
  assignedTo: TaskUser | null;
  category: string;
  completed: boolean;
  createdAt: Date;
  dueDate: Date;
  columnId?: number;
};

export type BoardProps = {
  id: number;
  owner: { userId: number };
  boardName: string;
  description: string;
  key: string;
  columns: BoardColumnProps[];
};

export type BoardColumnProps = {
  id: number;
  name: string;
  tasks: TaskProps[];
};

export type BoardListItemProps = {
  id: number;
  boardName: string;
  description: string;
  createdAt: Date;
};

export type BoardsProps = {
  list: BoardListItemProps[];
  currentBoard: BoardProps | null;
  currentTask: TaskProps | null;
};
