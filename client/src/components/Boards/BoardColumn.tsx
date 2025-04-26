import { useState } from 'react';

type BoardColumnProps = {
  id: number;
  name: string;
  tasks: Array<any>;
};

export default function BoardColumn({ id, name, tasks }: BoardColumnProps) {
  const [showCreateTask, setShowCreateTask] = useState(false);

  const handleCreateTask = () => {
    setShowCreateTask(!showCreateTask);
  };

  const renderTasks = () => {
    if (tasks) {
      return (
        <div className='board-column-tasks'>
          {tasks.map((task) => (
            <div key={task.id} className='board-column-task'>
              <h4 className=''>{task.title}</h4>
              <p>{task.description}</p>
            </div>
          ))}
          <div className='board-column-task'>
            <h4>Task 1</h4>
            <p>Description</p>
          </div>
          <div className='board-create-task'>
            <i className='fa-solid fa-plus'></i>
            <p>Create Task</p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div
      onMouseOver={handleCreateTask}
      onMouseOut={handleCreateTask}
      className='board-column'
    >
      <h3 className='board-column-header'>{name}</h3>
      <div className='board-column-tasks'>{renderTasks()}</div>
    </div>
  );
}
