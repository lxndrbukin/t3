import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const createTaskCategory = createAsyncThunk(
  'tasks/createTaskCategory',
  async ({ userId, data }: { userId: string; data: any }) => {
    const response = await axios.post(`/v1/tasks/${userId}`, {
      type: 'category',
      ...data,
    });
    return response.data;
  }
);
