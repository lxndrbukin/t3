import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getBoardsList = createAsyncThunk(
  'tasks/getBoardsList',
  async (userId: string) => {
    const response = await axios.get(`/v1/boards/${userId}`);
    return response.data;
  }
);

export const createBoard = createAsyncThunk(
  'tasks/createBoard',
  async ({ userId, data }: { userId: string; data: any }) => {
    const response = await axios.post(`/v1/boards/${userId}`, data);
    return response.data;
  }
);
