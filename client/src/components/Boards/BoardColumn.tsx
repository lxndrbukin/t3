import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import CreateBoardTaskForm from './CreateBoardTaskForm';
import Popup from '../../assets/reusable/Popup';

type BoardColumnProps = {
  id: number;
  name: string;
  tasks: Array<any>;
};

export default function BoardColumn({ id, name, tasks }: BoardColumnProps) {
  const { user } = useSelector((state: RootState) => state.session);
  const { currentBoard, list } = useSelector(
    (state: RootState) => state.boards
  );

  const [showCreateTask, setShowCreateTask] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);

  const handleCreateTask = () => {
    setShowCreateTask(!showCreateTask);
  };

  const handleCreateTaskForm = () => {
    setShowCreateTask(false);
    setShowCreateForm(!showCreateForm);
  };

  const renderCreateTask = () => {
    if (showCreateTask) {
      return (
        <div onClick={handleCreateTaskForm} className='board-create-task'>
          <i className='fa-solid fa-plus'></i>
          <p>Create Task</p>
        </div>
      );
    }
    return null;
  };

  const renderTasks = () => {
    if (tasks) {
      return (
        <div className='board-column-tasks'>
          {tasks.map((task) => (
            <div key={task.id} className='board-column-task'>
              <h4 className='board-column-task-title'>{task.title}</h4>
              <p className='board-column-task-description'>
                {task.description}
              </p>
              <div className='board-column-task-owner'></div>
            </div>
          ))}
          <div className='board-column-task'>
            <h4 className='board-column-task-title'>Task 1</h4>
            <p className='board-column-task-description'>Description</p>
            <div className='board-column-task-owner'>
              <p>Owner</p>
              <i className='fa-solid fa-user'></i>
            </div>
          </div>
          {renderCreateTask()}
        </div>
      );
    }
    return null;
  };

  return (
    <div
      onMouseEnter={handleCreateTask}
      onMouseLeave={handleCreateTask}
      className='board-column'
    >
      <h3 className='board-column-header'>{name}</h3>
      <div className='board-column-tasks'>{renderTasks()}</div>
      {showCreateForm && (
        <Popup setIsVisible={setShowCreateForm}>
          <CreateBoardTaskForm
            boards={list!}
            currentColumn={name}
            currentBoard={currentBoard!}
          />
        </Popup>
      )}
    </div>
  );
}
