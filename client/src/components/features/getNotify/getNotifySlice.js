/** @format */

import { createAsyncThunk, createAction, createSlice } from "@reduxjs/toolkit";
import getNotifyService from "./getNotifyService";

const initialState = {
  getNotifys: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

//RESET ALL STATES ON LOGOUT
export const revertAll = createAction("REVERT_ALL");

//GET CONNECTION LIST

export const getNotification = createAsyncThunk(
  "getNotify/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      return await getNotifyService.getNotification(token);
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

export const getNotifySlice = createSlice({
  name: "getNotify",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getNotification.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getNotification.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.getNotifys = action.payload;
      })
      .addCase(getNotification.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(revertAll, () => initialState);
  },
});

export const { reset } = getNotifySlice.actions;
export default getNotifySlice.reducer;
