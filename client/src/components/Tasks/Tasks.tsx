import './assets/styles.scss';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState, getAllTasks } from '../../store';
import { convertDate } from './assets/helpers';

import CreateTask from './CreateTask';
import CreateCategory from './CreateCategory';
import Popup from '../../assets/reusable/Popup';
import TaskInfo from './TaskInfo';

export default function Tasks() {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.session);
  const { list } = useSelector((state: RootState) => state.tasks);

  const [showCreateTask, setShowCreateTask] = useState<boolean>(false);
  const [showCreateCategory, setShowCreateCategory] = useState<boolean>(false);
  const [showTaskInfo, setShowTaskInfo] = useState<boolean>(false);
  const [taskId, setTaskId] = useState<number | null>(null);

  useEffect(() => {
    if (!user?.googleId) return;
    dispatch(getAllTasks(user.googleId));
  }, [dispatch, user?.googleId]);

  const handleTaskClick = (taskId: number) => {
    setTaskId(taskId);
    setShowTaskInfo(true);
  };

  const renderTasks = () => {
    return list.map((task) => (
      <li onClick={() => handleTaskClick(task.id)} key={task.id}>
        <div className='task'>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <p>{task.dueDate && convertDate(task.dueDate)}</p>
        </div>
      </li>
    ));
  };

  const renderTaskPopup = () => {
    return (
      <Popup setIsVisible={setShowCreateTask}>
        <CreateTask setIsVisible={setShowCreateTask} />
      </Popup>
    );
  };

  const renderCategoryPopup = () => {
    return (
      <Popup setIsVisible={setShowCreateCategory}>
        <CreateCategory setIsVisible={setShowCreateCategory} />
      </Popup>
    );
  };

  const renderTaskInfoPopup = () => {
    return (
      <Popup setIsVisible={setShowTaskInfo}>
        <TaskInfo taskId={taskId as number} />
      </Popup>
    );
  };

  return (
    <>
      <div className='tasks-board'>
        <h1>Tasks</h1>
        <div className='tasks-buttons'>
          <button onClick={() => setShowCreateCategory(true)}>
            Create Category
          </button>
          <button onClick={() => setShowCreateTask(true)}>Create Task</button>
        </div>
        <div className='tasks-lists'>
          <div className='tasks-list-container'>
            <ul className='tasks-list'>{renderTasks()}</ul>
          </div>
        </div>
      </div>
      {showCreateTask && renderTaskPopup()}
      {showCreateCategory && renderCategoryPopup()}
      {showTaskInfo && renderTaskInfoPopup()}
    </>
  );
}
