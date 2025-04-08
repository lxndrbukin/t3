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
