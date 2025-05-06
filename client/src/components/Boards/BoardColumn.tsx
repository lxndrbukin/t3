import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import CreateBoardTaskForm from "./CreateBoardTaskForm";
import BoardTaskInfo from "./BoardTaskInfo";
import Popup from "../../assets/reusable/Popup";

type BoardColumnProps = {
  id: number;
  name: string;
  tasks: Array<any>;
};

export default function BoardColumn({ id, name, tasks }: BoardColumnProps) {
  const { currentBoard, list } = useSelector(
    (state: RootState) => state.boards
  );

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showTaskInfo, setShowTaskInfo] = useState(false);
  const [data, setData] = useState({
    taskId: 0,
    columnId: 0,
    boardId: 0,
  });

  const handleCreateTaskForm = () => {
    setShowCreateForm(!showCreateForm);
  };

  const handleTaskInfo = ({
    taskId,
    columnId,
    boardId,
  }: {
    taskId: number;
    columnId: number;
    boardId: number;
  }) => {
    setShowTaskInfo(true);
    setData({ taskId, columnId, boardId });
  };

  const renderCreateTask = () => {
    return (
      <div onClick={handleCreateTaskForm} className="board-create-task">
        <i className="fa-solid fa-plus"></i>
        <p>Create Task</p>
      </div>
    );
  };

  const renderTasks = () => {
    if (tasks) {
      return (
        <div className="board-column-tasks">
          {tasks.map((task) => (
            <div
              onClick={() =>
                handleTaskInfo({
                  taskId: task.id,
                  columnId: id,
                  boardId: currentBoard!.id,
                })
              }
              key={task.id}
              className="board-column-task"
            >
              <h4 className="board-column-task-title">{task.title}</h4>
              <p className="board-column-task-description">
                {task.description}
              </p>
              <div className="board-column-task-info">
                <div className="borad-column-task-key">
                  <i className="fa-solid fa-square"></i>
                  <span>{task.key}</span>
                </div>
                <div className="board-column-task-owner"></div>
              </div>
            </div>
          ))}
          {renderCreateTask()}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="board-column">
      <h3 className="board-column-header">
        <span>{name}</span>
        <span>{tasks.length}</span>
      </h3>
      <div className="board-column-tasks">{renderTasks()}</div>
      {showCreateForm && (
        <Popup setIsVisible={setShowCreateForm}>
          <CreateBoardTaskForm
            boards={list!}
            currentColumn={{ id, name }}
            currentBoard={currentBoard!}
            setIsVisible={setShowCreateForm}
          />
        </Popup>
      )}
      {showTaskInfo && (
        <Popup setIsVisible={setShowTaskInfo}>
          <BoardTaskInfo
            data={{
              taskId: data.taskId,
              columnId: data.columnId,
              boardId: data.boardId,
            }}
          />
        </Popup>
      )}
    </div>
  );
}
