import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../store";
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
  const { currentTask } = useSelector((state: RootState) => state.boards);

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
          <div className="board-task-info-owner">
            <i className="fa-solid fa-user"></i>
            <span>{currentTask?.owner || ""}</span>
          </div>
        </div>
        <div className="board-task-info-right">
          <div className="board-task-info-right-item">
            <h5>Status:</h5>
            <span></span>
          </div>
          <div className="board-task-info-right-item">
            <h5>Assignee:</h5>
            <span></span>
          </div>
          <div className="board-task-info-right-item">
            <h5>Reporter:</h5>
            <span></span>
          </div>
        </div>
      </div>
    </div>
  );
}
