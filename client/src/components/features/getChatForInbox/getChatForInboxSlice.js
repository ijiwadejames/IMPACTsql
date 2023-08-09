/** @format */

import { createAsyncThunk, createAction, createSlice } from "@reduxjs/toolkit";
import getChatForInboxService from "./getChatForInboxService";

const initialState = {
  chatsTitles: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

//RESET ALL STATES ON LOGOUT
export const revertAll = createAction("REVERT_ALL");

//get read message
export const getChatsTitle = createAsyncThunk(
  "chatHead/get",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      return await getChatForInboxService.getChatsTitle(token);
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

export const getChatForInboxSlice = createSlice({
  name: "chatsTitle",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder

      .addCase(getChatsTitle.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getChatsTitle.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.chatsTitles = action.payload;
      })
      .addCase(getChatsTitle.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(revertAll, () => initialState);
  },
});

export const { reset } = getChatForInboxSlice.actions;
export default getChatForInboxSlice.reducer;
