import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TaskProps } from './types';
import { getAllTasks } from '../thunks/tasks';
import { createTaskCategory } from '../thunks/taskCategories';

const initialState: { list: TaskProps[]; categories: string[] } = {
  list: [],
  categories: [],
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
    builder.addCase(
      createTaskCategory.fulfilled,
      (state: { categories: string[] }, action: PayloadAction<string[]>) => {
        state.categories = action.payload;
      }
    );
  },
});

export default tasksSlice.reducer;
