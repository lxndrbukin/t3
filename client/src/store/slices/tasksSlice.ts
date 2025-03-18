import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TaskProps } from './types';
import { getAllTasks } from '../thunks/tasks';

const initialState: { list: TaskProps[] } = {
  list: [],
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getAllTasks.fulfilled,
      (state: { list: TaskProps[] }, action: PayloadAction<TaskProps[]>) => {
        state.list = action.payload;
      }
    );
  },
});

export default tasksSlice.reducer;
