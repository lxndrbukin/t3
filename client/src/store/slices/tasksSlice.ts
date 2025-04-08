import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TaskProps, TasksProps } from './types';
import { getAllTasks, getTask } from '../thunks/tasks';
import { createTaskCategory } from '../thunks/taskCategories';

const initialState: TasksProps = {
  list: [],
  currentTask: null,
  categories: [],
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getAllTasks.fulfilled,
      (
        state: { list: TaskProps[]; categories: string[] },
        action: PayloadAction<{ tasks: TaskProps[]; categories: string[] }>
      ) => {
        state.list = action.payload.tasks;
        state.categories = action.payload.categories;
      }
    );
    builder.addCase(
      getTask.fulfilled,
      (
        state: { currentTask: TaskProps | null },
        action: PayloadAction<TaskProps>
      ) => {
        state.currentTask = action.payload;
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
