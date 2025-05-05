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
  isLoading: false,
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
        state.isLoading = false;
      }
    );
    builder.addCase(createBoard.pending, (state: BoardsProps) => {
      state.isLoading = true;
    });
    builder.addCase(createBoard.rejected, (state: BoardsProps) => {
      state.isLoading = false;
    });
    builder.addCase(
      getBoard.fulfilled,
      (state: BoardsProps, action: PayloadAction<BoardProps>) => {
        state.currentBoard = action.payload;
        state.isLoading = false;
      }
    );
    builder.addCase(getBoard.pending, (state: BoardsProps) => {
      state.isLoading = true;
    });
    builder.addCase(getBoard.rejected, (state: BoardsProps) => {
      state.isLoading = false;
    });
    builder.addCase(
      createColumn.fulfilled,
      (state: BoardsProps, action: PayloadAction<BoardColumnProps>) => {
        state.currentBoard!.columns.push(action.payload);
        state.isLoading = false;
      }
    );
    builder.addCase(createColumn.pending, (state: BoardsProps) => {
      state.isLoading = true;
    });
    builder.addCase(createColumn.rejected, (state: BoardsProps) => {
      state.isLoading = false;
    });
    builder.addCase(
      deleteColumn.fulfilled,
      (state: BoardsProps, action: PayloadAction<number>) => {
        state.currentBoard!.columns = state.currentBoard!.columns.filter(
          (column) => column.id !== action.payload
        );
        state.isLoading = false;
      }
    );
    builder.addCase(deleteColumn.pending, (state: BoardsProps) => {
      state.isLoading = true;
    });
    builder.addCase(deleteColumn.rejected, (state: BoardsProps) => {
      state.isLoading = false;
    });
    builder.addCase(
      getTask.fulfilled,
      (state: BoardsProps, action: PayloadAction<TaskProps>) => {
        state.currentTask = action.payload;
        state.isLoading = false;
      }
    );
    builder.addCase(
      createTask.fulfilled,
      (state: BoardsProps, action: PayloadAction<TaskProps>) => {
        if (!state.currentBoard) return;
        state.currentBoard.columns
          .find((column) => column.id === action.payload.columnId)!
          .tasks.push(action.payload);
        state.isLoading = false;
      }
    );
    builder.addCase(createTask.pending, (state: BoardsProps) => {
      state.isLoading = true;
    });
    builder.addCase(createTask.rejected, (state: BoardsProps) => {
      state.isLoading = false;
    });
  },
});

export default boardsSlice.reducer;
