/** @format */

import { createSlice, createAction, createAsyncThunk } from "@reduxjs/toolkit";
import delPostService from "./delPostService";
// import revertAll from "../actions/actions";

const initialState = {
  delPosts: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

//RESET ALL STATES ON LOGOUT
export const revertAll = createAction("REVERT_ALL");

//DeletePost post
export const deletePost = createAsyncThunk(
  "delPost/delete",
  async (pstID, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      return await delPostService.deletePost(pstID, token);
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

export const delPostSlice = createSlice({
  name: "delPost",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(deletePost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.delPosts = state.delPosts.filter(
          (delPost) => delPost.id !== action.payload.id
        );
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(revertAll, () => initialState);
  },
});

export const { reset } = delPostSlice.actions;
export default delPostSlice.reducer;
