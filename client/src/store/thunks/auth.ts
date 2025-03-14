import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const googleLogin = createAsyncThunk('session/googleLogin', async () => {
  window.location.href = 'http://localhost:5000/v1/auth/google';
});
