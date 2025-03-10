import './assets/styles.scss';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

export default function Tasks() {
  const { isLoggedIn } = useSelector((state: RootState) => state.session);
  const [authChecked, setAuthChecked] = useState<boolean>(false);

  const navigate = useNavigate();

  // useEffect(() => {
  //   if (isLoggedIn === undefined) return;
  //   if (!isLoggedIn) {
  //     navigate('/auth', { replace: true });
  //   }
  //   setAuthChecked(true);
  // }, [isLoggedIn, navigate]);

  // if (!authChecked) return <div>Loading...</div>;
  return (
    <div className='tasks-board'>
      <h1>Tasks</h1>
      <div className='tasks-lists'>
        <div className='tasks-list-container'>
          <h2>To Do</h2>
          <ul className='tasks-list'>
            <li>Task 1</li>
            <li>Task 2</li>
            <li>Task 3</li>
          </ul>
        </div>
        <div className='tasks-list'>
          <h2>In Progress</h2>
          <ul>
            <li>Task 1</li>
            <li>Task 2</li>
            <li>Task 3</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
