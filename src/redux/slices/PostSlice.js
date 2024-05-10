/* eslint-disable no-empty-pattern */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async ({ activeSort, tag }) => {
  try {
    console.log(tag);
    console.log(`/posts${tag ? `/tags/${tag}` : ''}`);
    const { data } = await axios.get(`/posts${tag ? `/tags/${tag}` : '/'}`, {
      params: { activeSort: activeSort }, // передача activeSort как параметра строки запроса
    });
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const fetchTags = createAsyncThunk('posts/fetchTags', async () => {
  try {
    const { data } = await axios.get('posts/tags');
    return data;
  } catch (error) {}
});

export const fetchComments = createAsyncThunk('posts/fetchComments', async () => {
  try {
    const { data } = await axios.get('posts/comments');
    return data;
  } catch (error) {}
});

export const deletePost = createAsyncThunk('posts/deletePost', async (id) => {
  try {
    const { data } = await axios.delete(`posts/${id}`);
    console.log(data);
    return data;
  } catch (error) {}
});

const initialState = {
  posts: {
    items: [],
    status: 'loading',
  },
  tags: {
    items: [],
    status: 'loading',
  },
  comments: {
    items: [],
    status: 'loading',
  },
};

const PostSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchPosts.pending]: (state) => {
      state.posts.items = [];
      state.posts.status = 'loading';
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.posts.status = 'loaded';
      state.posts.items = action.payload.posts;
    },
    [fetchPosts.rejected]: (state) => {
      state.posts.status = 'error';
      state.posts.items = [];
    },
    [fetchTags.pending]: (state) => {
      state.tags.items = [];
      state.tags.status = 'loading';
    },
    [fetchTags.fulfilled]: (state, action) => {
      state.tags.status = 'loaded';
      state.tags.items = action.payload.tags;
    },
    [fetchTags.rejected]: (state) => {
      state.tags.status = 'error';
      state.tags.items = [];
    },
    [fetchComments.pending]: (state) => {
      state.comments.items = [];
      state.comments.status = 'loading';
    },
    [fetchComments.fulfilled]: (state, action) => {
      state.comments.status = 'loaded';
      state.comments.items = action.payload.comments;
    },
    [fetchComments.rejected]: (state) => {
      state.comments.status = 'error';
      state.comments.items = [];
    },
    [deletePost.fulfilled]: (state, action) => {
      state.posts.status = 'loaded';
      console.log(action.payload);
      state.posts.items = state.posts.items.filter((item) => item._id !== action.payload.id);
    },
    [deletePost.rejected]: (state) => {
      state.posts.status = 'error';
      state.posts.items = [];
    },
  },
});

export const {} = PostSlice.actions;

export default PostSlice.reducer;
