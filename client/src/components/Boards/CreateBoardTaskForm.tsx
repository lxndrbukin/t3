import { FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  RootState,
  AppDispatch,
  BoardProps,
  BoardListItemProps,
  getBoardsList,
  createTask,
} from "../../store";

type CreateBoardTaskFormProps = {
  boards?: BoardListItemProps[];
  currentColumn?: { id: number; name: string };
  currentBoard?: BoardProps;
  setIsVisible: (isVisible: boolean) => void;
};

export default function CreateBoardTaskForm({
  boards,
  currentColumn,
  currentBoard,
  setIsVisible,
}: CreateBoardTaskFormProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.session);
  const { isLoading } = useSelector((state: RootState) => state.boards);

  const [columnId, setColumnId] = useState<number>(currentColumn?.id!);

  useEffect(() => {
    if (boards?.length === 0) {
      dispatch(getBoardsList(user?.userId!));
    }
  }, [boards?.length]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const taskData = {
      title: e.currentTarget.taskTitle.value,
      description: e.currentTarget.description.value,
      dueDate: new Date(e.currentTarget.dueDate.value),
    };
    try {
      await dispatch(
        createTask({
          userId: user?.userId!,
          boardId: currentBoard?.id!,
          columnId,
          data: taskData,
        })
      ).unwrap();
      setIsVisible(false);
    } catch (error) {
      console.error("Failed to create task:", error);
    }
  };

  const handleColumnSelectChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    if (currentBoard) {
      const selectedColumn = currentBoard!.columns.find(
        (column) => column.name === e.currentTarget.value
      );
      if (selectedColumn) {
        setColumnId(selectedColumn.id);
      }
    }
  };

  const renderColumnSelectOptions = () => {
    if (currentBoard) {
      return currentBoard.columns.map((column) => (
        <option
          key={column.id}
          value={column.name}
          selected={column.name === currentColumn?.name}
        >
          {column.name}
        </option>
      ));
    }
    return null;
  };

  const renderBoardSelectOptions = () => {
    if (boards) {
      return boards.map((board) => (
        <option
          key={board.id}
          value={board.boardName}
          selected={board.boardName === currentBoard?.boardName}
        >
          {board.boardName}
        </option>
      ));
    }
    return null;
  };

  const renderSubmitButton = () => {
    return (
      <button disabled={isLoading} type="submit">
        {isLoading ? (
          <i className="fa-solid fa-circle-notch"></i>
        ) : (
          "Create Task"
        )}
      </button>
    );
  };

  return (
    <div className="create-board-task-form">
      <h2>Create Task</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="form-select">
          <label htmlFor="board">Board</label>
          <select
            name="board"
            id="board"
            disabled={currentBoard ? true : false}
          >
            {renderBoardSelectOptions()}
          </select>
        </div>
        <div className="form-select">
          <label htmlFor="type">Type</label>
          <select name="type" id="type" onChange={handleColumnSelectChange}>
            {renderColumnSelectOptions()}
          </select>
        </div>
        <div className="form-input">
          <label htmlFor="taskTitle">Title</label>
          <input
            type="text"
            placeholder="Short summary"
            id="taskTitle"
            name="taskTitle"
          />
        </div>
        <div className="form-textarea">
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            id="description"
            cols={30}
            rows={10}
            placeholder="Describe the task"
          ></textarea>
        </div>
        <div className="form-input">
          <label htmlFor="dueDate">Due</label>
          <input type="datetime-local" name="dueDate" id="dueDate" />
        </div>
        <div className="buttons">
          {renderSubmitButton()}
          <button onClick={() => setIsVisible(false)} type="button">
            Close
          </button>
        </div>
      </form>
    </div>
  );
}
