import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getBoardsList = createAsyncThunk(
  'boards/getBoardsList',
  async (userId: string) => {
    const response = await axios.get(`/v1/boards/${userId}`);
    return response.data;
  }
);

export const createBoard = createAsyncThunk(
  'boards/createBoard',
  async ({ userId, data }: { userId: string; data: any }) => {
    const response = await axios.post(`/v1/boards/${userId}`, data);
    return response.data;
  }
);

export const getBoard = createAsyncThunk(
  'boards/getBoard',
  async ({ userId, boardId }: { userId: string; boardId: string }) => {
    const response = await axios.get(`/v1/boards/${userId}/${boardId}`);
    return response.data;
  }
);
