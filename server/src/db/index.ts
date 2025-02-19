import mongoose from 'mongoose';

require('dotenv').config();
export default async function connectToMongoDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URL as string);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
  }
}
