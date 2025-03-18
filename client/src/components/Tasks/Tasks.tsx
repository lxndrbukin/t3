import './assets/styles.scss';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState, getAllTasks } from '../../store';

export default function Tasks() {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.session);
  const { list } = useSelector((state: RootState) => state.tasks);

  useEffect(() => {
    if (!user?.googleId) return;
    dispatch(getAllTasks(user.googleId));
  }, [dispatch, user?.googleId]);

  const convertDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const dd = day < 10 ? `0${day}` : day;
    const month = date.getMonth() + 1;
    const mm = month < 10 ? `0${month}` : month;
    const year = date.getFullYear();
    return `${dd}/${mm}/${year}`;
  };

  const renderTasks = () => {
    return list.map((task) => (
      <li key={task.id}>
        <div className='task'>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <p>{task.dueDate && convertDate(task.dueDate)}</p>
        </div>
      </li>
    ));
  };

  return (
    <div className='tasks-board'>
      <h1>Tasks</h1>
      <div className='tasks-buttons'>
        <Link to='/tasks/new'>New Task</Link>
      </div>
      <div className='tasks-lists'>
        <div className='tasks-list-container'>
          <h2>To Do</h2>
          <ul className='tasks-list'>{renderTasks()}</ul>
        </div>
        <div className='tasks-list-container'>
          <h2>In Progress</h2>
          <ul className='tasks-list'>
            <li>
              <div className='task'>
                <h3>Task 1</h3>
                <p>Description</p>
                <p>Due Date</p>
              </div>
            </li>
            <li>
              <div className='task'>
                <h3>Task 2</h3>
                <p>Description</p>
                <p>Due Date</p>
              </div>
            </li>
            <li>
              <div className='task'>
                <h3>Task 3</h3>
                <p>Description</p>
                <p>Due Date</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
