import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BoardProps, BoardsProps } from './types';

const initialState: BoardsProps = {
  list: [],
  currentBoard: null,
};

const tasksSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export default tasksSlice.reducer;
