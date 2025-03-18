import { configureStore } from '@reduxjs/toolkit';
import session from './slices/sessionSlice';

export const store = configureStore({
  reducer: {
    session,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export * from './thunks/currentSession';
export * from './thunks/auth';
export * from './thunks/tasks';
