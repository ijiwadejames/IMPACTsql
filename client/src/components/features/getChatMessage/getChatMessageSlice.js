/** @format */

import { createAsyncThunk, createAction, createSlice } from "@reduxjs/toolkit";
import getChatMessageService from "./getChatMessageService";
// import revertAll from "../actions/actions";

const initialState = {
  chatMsgs: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

//RESET ALL STATES ON LOGOUT
export const revertAll = createAction("REVERT_ALL");

//get read message
export const readMessage = createAsyncThunk(
  "chatMsg/get",
  async (pid, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      return await getChatMessageService.readMessage(pid, token);
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

export const messageSlice = createSlice({
  name: "chatMsg",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder

      .addCase(readMessage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(readMessage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.chatMsgs = action.payload;
      })
      .addCase(readMessage.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(revertAll, () => initialState);
  },
});

export const { reset } = messageSlice.actions;
export default messageSlice.reducer;
