/** @format */

import { createSlice, createAction, createAsyncThunk } from "@reduxjs/toolkit";
import friendService from "./friendService";

const initialState = {
  getFriends: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

//RESET ALL STATES ON LOGOUT
export const revertAll = createAction("REVERT_ALL");

export const friendsBtn = createAsyncThunk(
  "friend/btn",
  async (pid, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      return await friendService.friendsBtn(pid, token);
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

export const friendSlice = createSlice({
  name: "getFriend",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(friendsBtn.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(friendsBtn.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.getFriends = action.payload;
      })
      .addCase(friendsBtn.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(revertAll, () => initialState);
  },
});

export const { reset } = friendSlice.actions;
export default friendSlice.reducer;
