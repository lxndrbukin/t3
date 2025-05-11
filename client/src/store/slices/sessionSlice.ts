import { createSlice } from '@reduxjs/toolkit';
import { SessionProps } from './types';
import { getCurrentSession } from '../thunks/currentSession';
import { login, logout, register } from '../thunks/auth';

const initialState: SessionProps = {
  isLoggedIn: false,
  user: undefined,
};

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getCurrentSession.fulfilled,
      (state: SessionProps, action) => {
        state.isLoggedIn = true;
        state.user = action.payload;
      }
    );
    builder.addCase(login.fulfilled, (state: SessionProps, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
    });
    builder.addCase(logout.fulfilled, (state: SessionProps) => {
      state.isLoggedIn = false;
      state.user = undefined;
    });
    builder.addCase(register.fulfilled, (state: SessionProps, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
    });
  },
});

export default sessionSlice.reducer;
