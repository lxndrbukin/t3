import mongoose, { Document, Model } from 'mongoose';

interface IUser {
  userId: number;
  googleId?: string;
  name: string;
  email: string;
  password?: string;
  joinDate: Date;
}

const userSchema = new mongoose.Schema<IUser>({
  userId: {
    type: Number,
    required: true,
    unique: true,
  },
  googleId: {
    type: String,
    sparse: true,
    index: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  joinDate: {
    type: Date,
    default: Date.now,
  },
});

userSchema.index({ googleId: 1 }, { unique: true, sparse: true });

const User = mongoose.model<IUser>('User', userSchema);

export default User;
