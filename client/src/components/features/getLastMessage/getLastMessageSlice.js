/** @format */

import { createAsyncThunk, createAction, createSlice } from "@reduxjs/toolkit";
import getLastMessageService from "./getLastMessageService";

const initialState = {
  lastMsgs: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

//RESET ALL STATES ON LOGOUT
export const revertAll = createAction("REVERT_ALL");

//get read message
export const lastMessage = createAsyncThunk(
  "lastMsg/get",
  async (pid, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      return await getLastMessageService.lastMessage(pid, token);
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

export const getLastMessageSlice = createSlice({
  name: "lastMsg",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder

      .addCase(lastMessage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(lastMessage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.lastMsgs = action.payload;
      })
      .addCase(lastMessage.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(revertAll, () => initialState);
  },
});

export const { reset } = getLastMessageSlice.actions;
export default getLastMessageSlice.reducer;
