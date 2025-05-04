import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch, BoardColumnProps } from "../../store";
import { getTask } from "../../store/thunks/boards";

type BoardTaskData = {
  data: {
    taskId: number;
    columnId: number;
    boardId: number;
  };
};

export default function BoardTaskInfo({
  data: { taskId, columnId, boardId },
}: BoardTaskData) {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.session);
  const { currentTask, currentBoard } = useSelector(
    (state: RootState) => state.boards
  );

  useEffect(() => {
    dispatch(
      getTask({
        userId: user?.userId!,
        boardId: boardId,
        columnId: columnId,
        taskId: taskId,
      })
    );
  }, [taskId]);

  const renderStatusSelect = () => {
    return currentBoard?.columns.map((column: BoardColumnProps) => {
      return (
        <option key={column.id} value={column.id}>
          {column.name}
        </option>
      );
    });
  };

  return (
    <div className="board-task-info-popup">
      <div className="board-task-info-header">
        <div className="board-task-info-key">
          <i className="fa-solid fa-square"></i>
          <span>{currentTask?.key || ""}</span>
        </div>
      </div>
      <div className="board-task-info-body">
        <div className="board-task-info-left">
          <h1 className="board-task-info-title">{currentTask?.title || ""}</h1>
          <p className="board-task-info-description">
            <h5>Description:</h5>
            {currentTask?.description || ""}
          </p>
        </div>
        <div className="board-task-info-right">
          <div className="board-task-info-right-item">
            <h5>Status:</h5>
            <select onChange={(e) => console.log(e.target.value)}>
              {renderStatusSelect()}
            </select>
          </div>
          <div className="board-task-info-right-item">
            <h5>Assignee:</h5>
            <div className="board-task-info-user">
              <i className="fa-solid fa-circle-user"></i>
              <span>{currentTask?.assignedTo?.name || ""}</span>
            </div>
          </div>
          <div className="board-task-info-right-item">
            <h5>Reporter:</h5>
            <div className="board-task-info-user">
              <i className="fa-solid fa-circle-user"></i>
              <span>{currentTask?.owner.name || ""}</span>
            </div>
          </div>
          {/* <div className="board-task-info-right-item">
            <h5>Created:</h5>
            <span>{currentTask?.createdAt || ""}</span>
          </div>
          <div className="board-task-info-right-item">
            <h5>Due Date:</h5>
            <span>{currentTask?.dueDate || ""}</span>
          </div> */}
        </div>
      </div>
    </div>
  );
}
