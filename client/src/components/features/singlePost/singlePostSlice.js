/** @format */

import { createAsyncThunk, createAction, createSlice } from "@reduxjs/toolkit";
import singlePostService from "./singlePostService";

const initialState = {
  singlePosts: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

//RESET ALL STATES ON LOGOUT
export const revertAll = createAction("REVERT_ALL");

//GET CONNECTION LIST

export const singlePost = createAsyncThunk(
  "getSinglePost/getAll",
  async (pstId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      return await singlePostService.singlePost(pstId, token);
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

export const singlePostSlice = createSlice({
  name: "singlePost",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(singlePost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(singlePost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.singlePosts = action.payload;
      })
      .addCase(singlePost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(revertAll, () => initialState);
  },
});

export const { reset } = singlePostSlice.actions;
export default singlePostSlice.reducer;
