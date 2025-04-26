import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState, getBoard } from '../../store';
import Section from '../../assets/reusable/Section';
import BoardColumns from './BoardColumns';

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

  return (
    <Section header={currentBoard?.boardName!}>
      <div className='board'>
        <BoardColumns columns={currentBoard?.columns!} />
      </div>
    </Section>
  );
}
