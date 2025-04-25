import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState, BoardProps, getBoard } from '../../store';
import Section from '../../assets/reusable/Section';

export default function Board() {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.session);
  const { currentBoard } = useSelector((state: RootState) => state.boards);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (user) {
      dispatch(getBoard({ userId: user.userId, boardId: Number(id) }));
    }
  }, [dispatch, user]);

  const renderColumns = () => {
    if (currentBoard) {
      const { columns } = currentBoard;
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
    }
    return null;
  };

  return (
    <Section header={currentBoard?.boardName!}>
      <div className='board'>
        <div className='board-columns'>{renderColumns()}</div>
      </div>
    </Section>
  );
}
