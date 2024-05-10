import { configureStore } from '@reduxjs/toolkit';
import PostSlice from './slices/PostSlice';
import AuthSlice from './slices/AuthSlice';

export const store = configureStore({
  reducer: {
    posts: PostSlice,
    auth: AuthSlice,
  },
});
