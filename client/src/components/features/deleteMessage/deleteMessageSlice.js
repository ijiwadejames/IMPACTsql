/** @format */

import { createSlice, createAction, createAsyncThunk } from "@reduxjs/toolkit";
import deleteMessageService from "./deleteMessageService";

const initialState = {
  delMessages: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

//RESET ALL STATES ON LOGOUT
export const revertAll = createAction("REVERT_ALL");

//DeletePost post
export const deleteMessage = createAsyncThunk(
  "delMessages/delete",
  async (uId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      return await deleteMessageService.deleteMessage(uId, token);
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

export const delMessagesSlice = createSlice({
  name: "delMessages",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteMessage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteMessage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.delMessages = state.delMessages.filter(
          (delMessages) => delMessages.id !== action.payload.id
        );
      })
      .addCase(deleteMessage.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(revertAll, () => initialState);
  },
});

export const { reset } = delMessagesSlice.actions;
export default delMessagesSlice.reducer;
