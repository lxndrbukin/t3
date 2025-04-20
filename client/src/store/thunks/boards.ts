import { createAsyncThunk } from '@reduxjs/toolkit';
import { BoardData } from './types';
import axios from 'axios';

export const getBoardsList = createAsyncThunk(
  'boards/getBoardsList',
  async (userId: number) => {
    const response = await axios.get(`/v1/boards/${userId}`);
    return response.data;
  }
);

export const createBoard = createAsyncThunk(
  'boards/createBoard',
  async ({ userId, data }: { userId: number; data: BoardData }) => {
    const response = await axios.post(`/v1/boards/${userId}`, data);
    return response.data;
  }
);

export const getBoard = createAsyncThunk(
  'boards/getBoard',
  async ({ userId, boardId }: { userId: number; boardId: string }) => {
    const response = await axios.get(`/v1/boards/${userId}/${boardId}`);
    return response.data;
  }
);
