import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  todos: [
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
      completed: {
        type: Boolean,
        default: false,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

const TodoList = mongoose.model('TodoList', todoSchema);

export default TodoList;

export type TodoListType = mongoose.Document & {
  userId: string;
  todos: {
    id: number;
    title: string;
    description: string;
    completed: boolean;
    createdAt: Date;
  }[];
};
