import './assets/styles.scss';
import { FunctionComponent, useState } from 'react';

import { BoardsGridItemProps } from './types';

import Popup from '../../assets/reusable/Popup';
import CreateBoardForm from './CreateBoardForm';
import BoardsGridItem from './BoardsGridItem';

export default function BoardsGrid() {
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
    if (boards.length === 0) {
      return renderCreateBoard();
    }
    return (
      <>
        {renderCreateBoard()}
        <div className='boards-grid'>
          {boards.map((board: BoardsGridItemProps) => {
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
