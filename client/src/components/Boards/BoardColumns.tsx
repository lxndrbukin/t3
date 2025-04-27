import { FormEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  RootState,
  BoardColumnProps,
  AppDispatch,
  createColumn,
} from '../../store';
import BoardColumn from './BoardColumn';
import Popup from '../../assets/reusable/Popup';

export default function BoardColumns({
  columns,
}: {
  columns: BoardColumnProps[];
}) {
  const dispatch = useDispatch<AppDispatch>();
  const [showCreateColumnForm, setShowCreateColumnForm] =
    useState<boolean>(false);
  const { user } = useSelector((state: RootState) => state.session);
  const { currentBoard } = useSelector((state: RootState) => state.boards);

  const handleCreateColumnForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const columnName = formData.get('columnName') as string;
    dispatch(
      createColumn({
        userId: user!.userId,
        boardId: currentBoard!.id,
        data: { columnName },
      })
    );
  };

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
        <form
          onSubmit={handleCreateColumnForm}
          className='board-create-column-form'
        >
          <h2>Create Column</h2>
          <div className='form-input'>
            <label htmlFor='title'>Name</label>
            <input
              type='text'
              placeholder='Column name'
              id='name'
              name='columnName'
            />
          </div>
          <button>Create</button>
        </form>
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
      {showCreateColumnForm && renderCreateColumnForm()}
    </div>
  );
}
