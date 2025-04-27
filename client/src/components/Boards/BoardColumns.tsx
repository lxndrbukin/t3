import { useState } from 'react';
import { BoardColumnProps } from '../../store';
import BoardColumn from './BoardColumn';
import Popup from '../../assets/reusable/Popup';

export default function BoardColumns({
  columns,
}: {
  columns: BoardColumnProps[];
}) {
  const [showCreateColumnForm, setShowCreateColumnForm] =
    useState<boolean>(false);

  const handleCreateColumn = () => {
    setShowCreateColumnForm(!showCreateColumnForm);
  };

  const renderCreateColumn = () => {
    return (
      <div onClick={handleCreateColumn} className='board-create-column'>
        <i className='fa-solid fa-plus'></i>
      </div>
    );
  };

  const renderCreateColumnForm = () => {
    return (
      <Popup setIsVisible={setShowCreateColumnForm}>
        <div className='board-create-column-form'>
          <input placeholder='Column Name' />
          <button>Create</button>
        </div>
      </Popup>
    );
  };

  const renderColumns = () => {
    if (columns) {
      return columns.map((column) => (
        <BoardColumn key={column.id} {...column} />
      ));
    }
    return null;
  };

  return (
    <div className='board-columns'>
      {renderColumns()}
      {renderCreateColumn()}
    </div>
  );
}
