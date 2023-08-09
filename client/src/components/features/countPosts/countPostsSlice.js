/** @format */

import { createAsyncThunk, createAction, createSlice } from "@reduxjs/toolkit";
import countPostsService from "./countPostsService";

const initialState = {
  countPosts: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

//RESET ALL STATES ON LOGOUT
export const revertAll = createAction("REVERT_ALL");

//COUNT POSTS

export const countMyPosts = createAsyncThunk(
  "posts/count",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      return await countPostsService.countMyPosts(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const countPostsSlice = createSlice({
  name: "countPost",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(countMyPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(countMyPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.countPosts = action.payload;
      })
      .addCase(countMyPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(revertAll, () => initialState);
  },
});

export const { reset } = countPostsSlice.actions;
export default countPostsSlice.reducer;
