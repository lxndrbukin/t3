import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState, BoardProps, getBoard } from '../../store';
import Section from '../../assets/reusable/Section';

export default function CurrentBoard({
  id,
  boardName,
  columns,
  owner,
}: BoardProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.session);

  useEffect(() => {
    if (user) {
      dispatch(getBoard({ userId: user.userId, boardId: id }));
    }
  }, [dispatch, user]);

  const renderColumns = () => {
    return columns.map((column) => (
      <div key={column.id} className='board-column'>
        <h3>{column.name}</h3>
        <div className='board-column-tasks'>
          {column.tasks.map((task) => (
            <div key={task.id} className='board-column-task'>
              <h4>{task.title}</h4>
              <p>{task.description}</p>
            </div>
          ))}
        </div>
      </div>
    ));
  };

  return (
    <Section header={boardName}>
      <div className='board'>
        <div className='board-columns'>{renderColumns()}</div>
      </div>
    </Section>
  );
}
