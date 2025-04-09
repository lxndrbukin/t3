import mongoose from 'mongoose';

const taskBoardSchema = new mongoose.Schema({
  owner: {
    type: String,
    required: true,
  },
  columns: [
    {
      _id: false,
      name: { type: String, required: true },
      order: { type: Number, required: true },
      tasks: [
        {
          _id: false,
          id: Number,
          title: { type: String, required: true },
          description: { type: String, default: '' },
          category: { type: String },
          completed: { type: Boolean, default: false },
          createdAt: { type: Date, default: Date.now },
          dueDate: { type: Date },
        },
      ],
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const TasksBoard = mongoose.model('TaskBoard', taskBoardSchema);

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
