import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getCurrentSession = createAsyncThunk(
  'session/getCurrentSession',
  async () => {
    const response = await axios.get('http://localhost:5000/v1/auth/user');
    return response.data;
  }
);
