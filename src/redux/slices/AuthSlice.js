import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchAuth = createAsyncThunk('/fetchAuth', async (params) => {
  console.log(params);
  try {
    const { data } = await axios.post('/auth/login', params);

    return data;
  } catch (error) {
    return alert(error.response.data.message);
  }
});

export const fetchRegister = createAsyncThunk('/fetchRegister', async (params) => {
  console.log(params);
  try {
    const { data } = await axios.post('/auth/register', params);
    return data;
  } catch (error) {
    return alert(error.response.data);
  }
});

export const fetchAuthMe = createAsyncThunk('/fetchAuthMe', async () => {
  console.log('data');
  const { data } = await axios.get('/auth/me');

  return data;
});

const initialState = {
  data: null,
  status: 'loading',
};

const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.data = null;
      state.status = 'loading';
    },
  },
  extraReducers: {
    [fetchAuth.pending]: (state) => {
      state.status = 'loading';
      state.data = null;
    },
    [fetchAuth.fulfilled]: (state, action) => {
      state.status = 'loaded';
      state.data = action.payload;
    },
    [fetchAuth.rejected]: (state) => {
      state.status = 'error';
      state.data = null;
    },
    [fetchAuthMe.pending]: (state) => {
      state.status = 'loading';
      state.data = null;
    },
    [fetchAuthMe.fulfilled]: (state, action) => {
      state.status = 'loaded';
      state.data = action.payload;
    },
    [fetchAuthMe.rejected]: (state) => {
      state.status = 'error';
      state.data = null;
    },
    [fetchRegister.pending]: (state) => {
      state.status = 'loading';
      state.data = null;
    },
    [fetchRegister.fulfilled]: (state, action) => {
      state.status = 'loaded';
      state.data = action.payload;
    },
    [fetchRegister.rejected]: (state) => {
      state.status = 'error';
      state.data = null;
    },
  },
});
export const selectIsAuth = (state) => Boolean(state.auth.loading === 'loaded');

export const { logout } = AuthSlice.actions;

export default AuthSlice.reducer;
