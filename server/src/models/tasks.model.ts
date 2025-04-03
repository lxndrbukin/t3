import mongoose from 'mongoose';

const tasksSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  tasks: [
    {
      id: {
        type: Number,
        required: true,
        unique: true,
      },
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      category: {
        type: String,
        default: 'Uncategorized',
      },
      completed: {
        type: Boolean,
        default: false,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
      dueDate: {
        type: Date,
        required: true,
      },
    },
  ],
  categories: [
    {
      id: {
        type: Number,
        required: true,
        unique: true,
      },
      name: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

export const TasksList = mongoose.model('TasksList', tasksSchema);

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
