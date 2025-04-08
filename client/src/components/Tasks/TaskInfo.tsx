import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState, getTask } from '../../store';

export default function TaskInfo({ taskId }: { taskId: number }) {
  const dispatch = useDispatch<AppDispatch>();

  const { currentTask } = useSelector((state: RootState) => state.tasks);
  const { user } = useSelector((state: RootState) => state.session);

  useEffect(() => {
    dispatch(
      getTask({
        userId: (user as any).googleId,
        taskId,
      })
    );
  }, [dispatch, taskId, user?.googleId]);

  return (
    <div className='task-container'>
      <div className='task-info'>
        <div className='task-info-header'>
          <h1>Task Name</h1>
        </div>
        <div className='task-info-body'>
          <p>Description</p>
        </div>
        <div className='task-info-footer'>
          <p>Due Date</p>
        </div>
      </div>
      <div className='task-comments'>
        <h2>Comments</h2>
        <div className='task-comments-container'>
          <p>Comment 1</p>
          <p>Comment 2</p>
          <p>Comment 3</p>
        </div>
      </div>
    </div>
  );
}
