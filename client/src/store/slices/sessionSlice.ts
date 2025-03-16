import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SessionProps } from './types';
import { getCurrentSession } from '../thunks/currentSession';
import { googleLogin } from '../thunks/auth';

const initialState: SessionProps = {
  isLoggedIn: false,
  user: undefined,
};

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = undefined;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getCurrentSession.fulfilled,
      (state: SessionProps, action) => {
        state.isLoggedIn = true;
        state.user = action.payload;
      }
    );
  },
});

export const { login, logout } = sessionSlice.actions;
export default sessionSlice.reducer;
