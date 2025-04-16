import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BoardProps, BoardsProps } from './types';
import { getAllTasks, getTask } from '../thunks/tasks';
import { createTaskCategory } from '../thunks/taskCategories';

const initialState: BoardsProps = {
  list: [],
  currentBoard: null,
};

const tasksSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export default tasksSlice.reducer;
