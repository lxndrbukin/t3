import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch, BoardColumnProps } from '../../store';
import { getTask } from '../../store/thunks/boards';
import { formatDate } from './helpers';

type BoardTaskData = {
  data: {
    taskId: number;
    columnId: number;
    boardId: number;
  };
};

export default function BoardTaskInfo({
  data: { taskId, columnId, boardId },
}: BoardTaskData) {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.session);
  const { currentTask, currentBoard } = useSelector(
    (state: RootState) => state.boards
  );

  const [isUpdateDescription, setIsUpdateDescription] = useState(false);

  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const [editableDescText, setEditableDescText] = useState('');

  useEffect(() => {
    dispatch(
      getTask({
        userId: user?.userId!,
        boardId: boardId,
        columnId: columnId,
        taskId: taskId,
      })
    );
  }, [taskId]);

  const handleOutsideClick = (event: MouseEvent) => {
    if (
      descriptionRef.current &&
      !descriptionRef.current.contains(event.target as Node)
    ) {
      setIsUpdateDescription(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    if (isUpdateDescription && descriptionRef.current) {
      descriptionRef.current.focus();
    }
  }, [isUpdateDescription]);

  const handleUpdateDescription = () => {
    setEditableDescText(currentTask?.description || '');
    setIsUpdateDescription(true);
  };

  const renderStatusSelect = () => {
    return currentBoard?.columns.map((column: BoardColumnProps) => {
      return (
        <option key={column.id} value={column.id}>
          {column.name}
        </option>
      );
    });
  };

  const renderUpdateDescription = () => {
    return (
      <textarea
        ref={descriptionRef}
        placeholder='Add a description...'
        value={editableDescText}
        onChange={(e) => setEditableDescText(e.target.value)}
      />
    );
  };

  const renderDescription = () => {
    if (!currentTask?.description) {
      return (
        <p
          onClick={handleUpdateDescription}
          style={{ cursor: 'pointer', fontStyle: 'italic', color: 'grey' }}
        >
          Add a description...
        </p>
      );
    }
    return (
      <p onClick={handleUpdateDescription} style={{ cursor: 'pointer' }}>
        {currentTask?.description}
      </p>
    );
  };

  return (
    <div className='board-task-info-popup'>
      <div className='board-task-info-header'>
        <div className='board-task-info-key'>
          <span>
            {currentBoard?.boardName} / <i className='fa-solid fa-square'></i>{' '}
            {currentTask?.key}
          </span>
        </div>
      </div>
      <div className='board-task-info-body'>
        <div className='board-task-info-left'>
          <h1 className='board-task-info-title'>{currentTask?.title}</h1>
          <div className='board-task-info-description'>
            <h5>Description:</h5>
            {isUpdateDescription
              ? renderUpdateDescription()
              : renderDescription()}
          </div>
          <div className='board-task-info-activity'>
            <h5>Activity:</h5>
            <div className='board-task-info-activity-headers'>
              <div className='board-task-info-activity-header-item'>
                <span>Comments</span>
              </div>
              <div className='board-task-info-activity-header-item'>
                <span>History</span>
              </div>
            </div>
          </div>
        </div>
        <div className='board-task-info-right'>
          <select
            className='board-task-info-right-select'
            onChange={(e) => console.log(e.target.value)}
          >
            {renderStatusSelect()}
          </select>
          <div className='board-task-info-right-item'>
            <h5>Assignee:</h5>
            <div className='board-task-info-user'>
              <i className='fa-solid fa-circle-user'></i>
              <span>{currentTask?.assignedTo?.name}</span>
            </div>
          </div>
          <div className='board-task-info-right-item'>
            <h5>Reporter:</h5>
            <div className='board-task-info-user'>
              <i className='fa-solid fa-circle-user'></i>
              <span>{currentTask?.owner.name}</span>
            </div>
          </div>
          <div className='board-task-info-right-item'>
            <h5>Created:</h5>
            <span>
              {currentTask?.createdAt
                ? formatDate(new Date(currentTask?.createdAt))
                : ''}
            </span>
          </div>
          <div className='board-task-info-right-item'>
            <h5>Due Date:</h5>
            <span>
              {currentTask?.dueDate
                ? formatDate(new Date(currentTask?.dueDate))
                : ''}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
