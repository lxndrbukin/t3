import mongoose from "mongoose";

const taskBoardSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  owner: {
    userId: Number,
  },
  key: {
    type: String,
    required: true,
  },
  boardName: {
    type: String,
    required: true,
    default: "New Board",
  },
  description: {
    type: String,
    default: "",
  },
  columns: [
    {
      _id: false,
      id: Number,
      name: { type: String, required: true },
      order: { type: Number, required: true },
      tasks: [
        {
          _id: false,
          id: Number,
          title: { type: String, required: true },
          description: { type: String, default: "" },
          key: { type: String },
          category: { type: String },
          owner: { userId: Number },
          assignedTo: { userId: Number },
          completed: { type: Boolean, default: false },
          createdAt: { type: Date, default: Date.now },
          dueDate: { type: Date },
        },
      ],
    },
  ],
  visibility: {
    type: String,
    enum: ["Team", "Private"],
  },
  members: [
    {
      _id: false,
      userId: Number,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const TasksBoard = mongoose.model("TaskBoard", taskBoardSchema);

export type TasksListType = mongoose.Document & {
  userId: string;
  tasks: {
    id: number;
    title: string;
    description: string;
    completed: boolean;
    createdAt: Date;
    dueDate: Date;
  }[];
};
