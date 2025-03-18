import { configureStore } from '@reduxjs/toolkit';
import session from './slices/sessionSlice';
import tasks from './slices/tasksSlice';

export const store = configureStore({
  reducer: {
    session,
    tasks,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export * from './thunks/currentSession';
export * from './thunks/auth';
export * from './thunks/tasks';
