import './assets/styles.scss';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  AppDispatch,
  RootState,
  BoardListItemProps,
  getBoardsList,
} from '../../store';

import Popup from '../../assets/reusable/Popup';
import CreateBoardForm from './CreateBoardForm';
import BoardsGridItem from './BoardsGridItem';

export default function BoardsGrid() {
  const dispatch = useDispatch<AppDispatch>();
  const { list } = useSelector((state: RootState) => state.boards);
  const { user } = useSelector((state: RootState) => state.session);

  useEffect(() => {
    if (user) {
      dispatch(getBoardsList(user.userId));
    }
  }, [dispatch, user]);

  const boards: Array<any> = [
    {
      id: 1,
      name: 'Board 1',
      description: 'Description 1',
      createdAt: new Date(),
    },
    {
      id: 2,
      name: 'Board 2',
      description: 'Description 2',
      createdAt: new Date(),
    },
    {
      id: 3,
      name: 'Board 3',
      description: 'Description 3',
      createdAt: new Date(),
    },
    {
      id: 4,
      name: 'Board 4',
      description: 'Description 4',
      createdAt: new Date(),
    },
    {
      id: 5,
      name: 'Board 5',
      description: 'Description 5',
      createdAt: new Date(),
    },
    {
      id: 6,
      name: 'Board 6',
      description: 'Description 6',
      createdAt: new Date(),
    },
  ];

  const [showCreateBoard, setShowCreateBoard] = useState<boolean>(false);

  const renderCreateBoard = () => {
    return (
      <button
        onClick={() => setShowCreateBoard(true)}
        className='create-board-button'
      >
        Create Board
      </button>
    );
  };

  const renderBoards = () => {
    if (list.length === 0) {
      return renderCreateBoard();
    }
    return (
      <>
        {renderCreateBoard()}
        <div className='boards-grid'>
          {list.map((board: BoardListItemProps) => {
            return <BoardsGridItem key={board.id} {...board} />;
          })}
          <div
            onClick={() => setShowCreateBoard(true)}
            className='create-board'
          >
            <i className='fa-solid fa-plus'></i>
            <p>Create Board</p>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className='boards-grid-container'>
      {renderBoards()}
      {showCreateBoard && (
        <Popup setIsVisible={setShowCreateBoard}>
          <CreateBoardForm />
        </Popup>
      )}
    </div>
  );
}
