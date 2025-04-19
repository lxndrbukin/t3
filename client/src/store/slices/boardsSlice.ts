import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BoardProps, BoardsProps, BoardListItemProps } from './types';
import { getBoardsList, createBoard, getBoard } from '../thunks/boards';

const initialState: BoardsProps = {
  list: [],
  currentBoard: null,
};

const boardsSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getBoardsList.fulfilled,
      (state: BoardsProps, action: PayloadAction<BoardListItemProps[]>) => {
        state.list = action.payload;
      }
    );
    builder.addCase(
      createBoard.fulfilled,
      (state: BoardsProps, action: PayloadAction<BoardProps>) => {
        state.currentBoard = action.payload;
      }
    );
    builder.addCase(
      getBoard.fulfilled,
      (state: BoardsProps, action: PayloadAction<BoardProps>) => {
        state.currentBoard = action.payload;
      }
    );
  },
});

export default boardsSlice.reducer;
