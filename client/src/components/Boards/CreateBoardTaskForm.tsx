import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  RootState,
  AppDispatch,
  BoardProps,
  BoardListItemProps,
  getBoardsList,
} from '../../store';

type CreateBoardTaskFormProps = {
  boards?: BoardListItemProps[];
  currentColumn?: string;
  currentBoard?: BoardProps;
};

export default function CreateBoardTaskForm({
  boards,
  currentColumn,
  currentBoard,
}: CreateBoardTaskFormProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.session);

  useEffect(() => {
    if (boards?.length === 0) {
      dispatch(getBoardsList(user?.userId!));
    }
  }, [boards?.length]);

  const renderColumnSelectOptions = () => {
    if (currentBoard) {
      return currentBoard.columns.map((column) => (
        <option
          key={column.id}
          value={column.name}
          selected={column.name === currentColumn}
        >
          {column.name}
        </option>
      ));
    }
    return null;
  };

  const renderBoardSelectOptions = () => {
    if (boards) {
      return boards.map((board) => (
        <option
          key={board.id}
          value={board.boardName}
          selected={board.boardName === currentBoard?.boardName}
        >
          {board.boardName}
        </option>
      ));
    }
    return null;
  };

  return (
    <div className='create-board-task-form'>
      <h2>Create Task</h2>
      <form>
        <div className='form-select'>
          <label htmlFor='board'>Board</label>
          <select
            name='board'
            id='board'
            disabled={currentBoard ? true : false}
          >
            {renderBoardSelectOptions()}
          </select>
        </div>
        <div className='form-select'>
          <label htmlFor='type'>Type</label>
          <select name='type' id='type'>
            {renderColumnSelectOptions()}
          </select>
        </div>
        <div className='form-input'>
          <label htmlFor='title'>Title</label>
          <input
            type='text'
            placeholder='Short summary'
            id='title'
            name='title'
          />
        </div>
        <div className='form-textarea'>
          <label htmlFor='description'>Description</label>
          <textarea
            name='description'
            id='description'
            cols={30}
            rows={10}
            placeholder='Describe the task'
          ></textarea>
        </div>
        <button type='submit'>Create Task</button>
      </form>
    </div>
  );
}
