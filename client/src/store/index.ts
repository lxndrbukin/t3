import { configureStore } from '@reduxjs/toolkit';
import session from './slices/sessionSlice';
import boards from './slices/boardsSlice';

export const store = configureStore({
  reducer: {
    session,
    boards,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export * from './thunks/currentSession';
export * from './thunks/auth';
export * from './thunks/boards';

export * from './slices/types';
export * from './thunks/types';
