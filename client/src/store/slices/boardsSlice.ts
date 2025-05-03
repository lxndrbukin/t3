import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  BoardProps,
  BoardsProps,
  BoardColumnProps,
  BoardListItemProps,
  TaskProps,
} from "./types";
import {
  getBoardsList,
  createBoard,
  getBoard,
  createColumn,
  deleteColumn,
  getTask,
  createTask,
} from "../thunks/boards";

const initialState: BoardsProps = {
  list: [],
  currentBoard: null,
  currentTask: null,
};

const boardsSlice = createSlice({
  name: "boards",
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
    builder.addCase(
      createColumn.fulfilled,
      (state: BoardsProps, action: PayloadAction<BoardColumnProps>) => {
        state.currentBoard!.columns.push(action.payload);
      }
    );
    builder.addCase(
      deleteColumn.fulfilled,
      (state: BoardsProps, action: PayloadAction<number>) => {
        state.currentBoard!.columns = state.currentBoard!.columns.filter(
          (column) => column.id !== action.payload
        );
      }
    );
    builder.addCase(
      getTask.fulfilled,
      (state: BoardsProps, action: PayloadAction<TaskProps>) => {
        state.currentTask = action.payload;
      }
    );
    builder.addCase(
      createTask.fulfilled,
      (state: BoardsProps, action: PayloadAction<TaskProps>) => {
        if (!state.currentBoard) return;
        state.currentBoard.columns
          .find((column) => column.id === action.payload.columnId)!
          .tasks.push(action.payload);
      }
    );
  },
});

export default boardsSlice.reducer;
