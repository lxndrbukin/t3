import mongoose from 'mongoose';

const taskCategoriesSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
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

export const TaskCategories = mongoose.model(
  'TaskCategories',
  taskCategoriesSchema
);
