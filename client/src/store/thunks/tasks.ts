import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const createTask = createAsyncThunk(
  'tasks/createTask',
  async ({ userId, data }: { userId: string; data: any }) => {
    const response = await axios.post(`/v1/tasks/${userId}`, data);
    console.log(userId, data);
    return response.data;
  }
);

export const getTask = createAsyncThunk(
  'tasks/getTask',
  async ({ userId, taskId }: { userId: string; taskId: string }) => {
    const response = await axios.get(`/v1/tasks/${userId}/${taskId}`);
    return response.data;
  }
);

export const getAllTasks = createAsyncThunk(
  'tasks/getAllTasks',
  async (userId: string) => {
    const response = await axios.get(`/v1/tasks/${userId}`);
    return response.data;
  }
);
