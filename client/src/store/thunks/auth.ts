import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const googleLogin = createAsyncThunk('session/googleLogin', async () => {
  window.location.href = 'http://localhost:5000/v1/auth/google';
});

export const login = createAsyncThunk(
  'session/login',
  async (data: { email: string; password: string }) => {
    const response = await axios.post(
      'http://localhost:5000/v1/auth/login',
      data
    );
    return response.data;
  }
);

export const register = createAsyncThunk(
  'session/register',
  async (data: { email: string; password: string; name: string }) => {
    const response = await axios.post(
      'http://localhost:5000/v1/auth/register',
      data
    );
    return response.data;
  }
);

export const logout = createAsyncThunk(
  'session/logout',
  async (data: { userId: number }) => {
    const response = await axios.post(
      'http://localhost:5000/v1/auth/logout',
      data
    );
    return response.data;
  }
);
