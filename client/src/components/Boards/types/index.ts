export type BoardsGridItemProps = {
  id: number;
  name: string;
  description: string;
  createdAt: Date;
};

export type BoardTaskData = {
  data: {
    taskId: number;
    columnId: number;
    boardId: number;
  };
};
