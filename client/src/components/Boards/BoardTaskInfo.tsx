import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch, BoardColumnProps } from '../../store';
import { getTask, updateTask } from '../../store/thunks/boards';
import { formatDate } from './helpers';
import { BoardTaskData } from './types';
import { activityHeaders } from './assets';

export default function BoardTaskInfo({
  data: { taskId, columnId, boardId },
}: BoardTaskData) {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.session);
  const { currentTask, currentBoard } = useSelector(
    (state: RootState) => state.boards
  );

  const [isUpdateDescription, setIsUpdateDescription] = useState(false);
  const [taskData, setTaskData] = useState<{
    title?: string | undefined;
    description?: string | undefined;
    dueDate?: Date | undefined;
  }>({
    title: undefined,
    description: undefined,
    dueDate: undefined,
  });

  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const [editableDescText, setEditableDescText] = useState('');
  const [activity, setActivity] = useState('Comments');
  const [statusId, setStatusId] = useState(columnId);

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

  const handleDescChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditableDescText(e.target.value);
    setTaskData({
      ...taskData,
      description: e.target.value,
    });
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusId(Number(e.target.value));
    dispatch(
      updateTask({
        userId: user!.userId,
        boardId: currentBoard!.id,
        columnId: statusId,
        taskId: currentTask!.id,
        data: {
          ...taskData,
        },
      })
    );
  };

  const renderStatusSelect = () => {
    return currentBoard?.columns.map((column: BoardColumnProps) => {
      return (
        <option
          onClick={() => setStatusId(column.id)}
          key={column.id}
          value={column.id}
        >
          {column.name}
        </option>
      );
    });
  };

  const renderUpdateDesc = () => {
    return (
      <textarea
        ref={descriptionRef}
        placeholder='Add a description...'
        value={editableDescText}
        onChange={handleDescChange}
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

  const renderActivityHeaders = () => {
    return activityHeaders.map((header: string) => {
      return (
        <div
          onClick={() => setActivity(header)}
          key={header}
          className={`board-task-info-activity-header-item ${
            activity === header ? 'active' : ''
          }`}
        >
          <span>{header}</span>
        </div>
      );
    });
  };

  const renderActivity = () => {
    if (activity === 'Comments') {
      return (
        <textarea
          ref={descriptionRef}
          placeholder='Add a comment...'
          value={editableDescText}
          onChange={handleDescChange}
        />
      );
    }
    return null;
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
            {isUpdateDescription ? renderUpdateDesc() : renderDescription()}
          </div>
          <div className='board-task-info-activity'>
            <h5>Activity:</h5>
            <div className='board-task-info-activity-headers'>
              {renderActivityHeaders()}
            </div>
            {renderActivity()}
          </div>
        </div>
        <div className='board-task-info-right'>
          <select
            className='board-task-info-right-select'
            onChange={handleStatusChange}
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
