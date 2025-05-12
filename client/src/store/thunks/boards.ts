import { createAsyncThunk } from '@reduxjs/toolkit';
import { BoardData } from './types';
import axios from 'axios';

export const getBoardsList = createAsyncThunk(
  'boards/getBoardsList',
  async (userId: number) => {
    const response = await axios.get(`/v1/${userId}/boards`);
    return response.data;
  }
);

export const createBoard = createAsyncThunk(
  'boards/createBoard',
  async ({ userId, data }: { userId: number; data: BoardData }) => {
    const response = await axios.post(`/v1/${userId}/boards`, data);
    return response.data;
  }
);

export const getBoard = createAsyncThunk(
  'boards/getBoard',
  async ({ userId, boardId }: { userId: number; boardId: number }) => {
    const response = await axios.get(`/v1/${userId}/boards/${boardId}`);
    return response.data;
  }
);

export const createColumn = createAsyncThunk(
  'boards/createColumn',
  async ({
    userId,
    boardId,
    data,
  }: {
    userId: number;
    boardId: number;
    data: { columnName: string };
  }) => {
    const response = await axios.post(
      `/v1/${userId}/boards/${boardId}/columns`,
      data
    );
    return response.data;
  }
);

export const deleteColumn = createAsyncThunk(
  'boards/deleteColumn',
  async ({
    userId,
    boardId,
    columnId,
  }: {
    userId: number;
    boardId: number;
    columnId: number;
  }) => {
    const response = await axios.delete(
      `/v1/${userId}/boards/${boardId}/columns/${columnId}`
    );
    return response.data;
  }
);

export const getTask = createAsyncThunk(
  'boards/getTask',
  async ({
    userId,
    boardId,
    columnId,
    taskId,
  }: {
    userId: number;
    boardId: number;
    columnId: number;
    taskId: number;
  }) => {
    const response = await axios.get(
      `/v1/${userId}/boards/${boardId}/columns/${columnId}/tasks/${taskId}`
    );
    return response.data;
  }
);

export const createTask = createAsyncThunk(
  'boards/createTask',
  async ({
    userId,
    boardId,
    columnId,
    data,
  }: {
    userId: number;
    boardId: number;
    columnId: number;
    data: { title: string; description: string; dueDate: Date };
  }) => {
    const response = await axios.post(
      `/v1/${userId}/boards/${boardId}/columns/${columnId}/tasks`,
      data
    );
    return response.data;
  }
);

export const updateTask = createAsyncThunk(
  'boards/updateTask',
  async ({
    userId,
    boardId,
    columnId,
    taskId,
    data,
  }: {
    userId: number;
    boardId: number;
    columnId: number;
    taskId: number;
    data: { title?: string; description?: string; dueDate?: Date };
  }) => {
    const response = await axios.put(
      `/v1/${userId}/boards/${boardId}/columns/${columnId}/tasks/${taskId}`,
      data
    );
    return response.data;
  }
);
