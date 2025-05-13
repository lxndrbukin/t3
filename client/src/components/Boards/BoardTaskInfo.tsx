import { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch, BoardColumnProps } from '../../store';
import { getTask, updateTask } from '../../store/thunks/boards';
import { formatDate } from './helpers';
import { BoardTaskData } from './types';
import { activityHeaders } from './assets';

interface TaskDataState {
  title?: string;
  description?: string;
  dueDate?: Date;
}

export default function BoardTaskInfo({
  data: { taskId, columnId, boardId },
}: BoardTaskData) {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.session);
  const { currentTask, currentBoard } = useSelector(
    (state: RootState) => state.boards
  );

  const [isUpdateDescription, setIsUpdateDescription] = useState(false);
  const [taskData, setTaskData] = useState<TaskDataState>({
    title: undefined,
    description: undefined,
    dueDate: undefined,
  });

  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const [activity, setActivity] = useState('Comments');
  const [statusId, setStatusId] = useState(columnId);

  const updateTaskData = useCallback(
    (data: Partial<TaskDataState>) => {
      if (!user?.userId || !currentBoard?.id || !currentTask?.id) return;
      dispatch(
        updateTask({
          userId: user.userId,
          boardId: currentBoard.id,
          columnId: statusId,
          taskId: currentTask.id,
          data: {
            ...taskData,
            ...data,
          },
        })
      );
    },
    [dispatch, user, currentBoard, currentTask, statusId, taskData]
  );

  useEffect(() => {
    if (!user?.userId) return;
    dispatch(
      getTask({
        userId: user.userId,
        boardId,
        columnId,
        taskId,
      })
    );
  }, [dispatch, user, taskId, boardId, columnId]);

  useEffect(() => {
    if (currentTask?.description) {
      setTaskData((prev) => ({
        ...prev,
        description: currentTask.description,
      }));
    }
  }, [currentTask?.description]);

  const handleOutsideClick = useCallback(
    (event: MouseEvent) => {
      if (
        descriptionRef.current &&
        event.target &&
        !descriptionRef.current.contains(event.target as Node) &&
        taskData.description !== currentTask?.description &&
        taskData.description !== undefined &&
        taskData.description !== ''
      ) {
        updateTaskData({
          description: taskData.description,
        });
      }
      setIsUpdateDescription(false);
    },
    [
      descriptionRef,
      updateTaskData,
      taskData.description,
      currentTask?.description,
    ]
  );

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [handleOutsideClick]);

  useEffect(() => {
    if (isUpdateDescription && descriptionRef.current) {
      descriptionRef.current.focus();
    }
  }, [isUpdateDescription]);

  const handleUpdateDescription = useCallback(() => {
    setIsUpdateDescription(true);
  }, []);

  const handleDescChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setTaskData((prev) => ({
        ...prev,
        description: e.target.value,
      }));
    },
    []
  );

  const handleStatusChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const newStatusId = Number(e.target.value);
      setStatusId(newStatusId);
      updateTaskData({});
    },
    [updateTaskData]
  );

  const statusSelect = useMemo(() => {
    return currentBoard?.columns.map((column: BoardColumnProps) => (
      <option key={column.id} value={column.id}>
        {column.name}
      </option>
    ));
  }, [currentBoard?.columns]);

  const descriptionInput = useMemo(
    () => (
      <textarea
        ref={descriptionRef}
        placeholder='Add a description...'
        value={taskData.description || ''}
        onChange={handleDescChange}
      />
    ),
    [taskData.description, handleDescChange]
  );

  const descriptionDisplay = useMemo(() => {
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
        {currentTask.description}
      </p>
    );
  }, [currentTask?.description, handleUpdateDescription]);

  const activityHeadersList = useMemo(() => {
    return activityHeaders.map((header: string) => (
      <div
        onClick={() => setActivity(header)}
        key={header}
        className={`board-task-info-activity-header-item ${
          activity === header ? 'active' : ''
        }`}
      >
        <span>{header}</span>
      </div>
    ));
  }, [activity]);

  const activityContent = useMemo(() => {
    if (activity === 'Comments') {
      return (
        <textarea
          ref={descriptionRef}
          placeholder='Add a comment...'
          onChange={handleDescChange}
        />
      );
    }
    return null;
  }, [activity, handleDescChange]);

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
            {isUpdateDescription ? descriptionInput : descriptionDisplay}
          </div>
          <div className='board-task-info-activity'>
            <h5>Activity:</h5>
            <div className='board-task-info-activity-headers'>
              {activityHeadersList}
            </div>
            {activityContent}
          </div>
        </div>
        <div className='board-task-info-right'>
          <select
            className='board-task-info-right-select'
            onChange={handleStatusChange}
            value={statusId}
          >
            {statusSelect}
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
              <span>{currentTask?.owner?.name}</span>
            </div>
          </div>
          <div className='board-task-info-right-item'>
            <h5>Created:</h5>
            <div className='board-task-info-user'>
              <span>
                {currentTask?.createdAt
                  ? formatDate(new Date(currentTask.createdAt))
                  : ''}
              </span>
            </div>
          </div>
          <div className='board-task-info-right-item'>
            <h5>Due Date:</h5>
            <div className='board-task-info-user'>
              <span>
                {currentTask?.dueDate
                  ? formatDate(new Date(currentTask.dueDate))
                  : ''}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
