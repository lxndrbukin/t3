import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getAllTaskCategories = createAsyncThunk(
  'tasks/getAllTaskCategories',
  async (id: string) => {
    const response = await axios.get(`/v1/categories/${id}`);
    return response.data;
  }
);

export const createTaskCategory = createAsyncThunk(
  'tasks/createTaskCategory',
  async ({ id, data }: { id: string; data: any }) => {
    const response = await axios.post(`/v1/categories/${id}`, data);
    return response.data;
  }
);
