import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const createTask = createAsyncThunk(
  'tasks/createTask',
  async ({ id, data }: { id: string; data: any }) => {
    const response = await axios.post(`/v1/tasks/${id}`, data);
    console.log(id, data);
    return response.data;
  }
);
