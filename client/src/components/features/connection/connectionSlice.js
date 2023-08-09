/** @format */

import { createSlice, createAction, createAsyncThunk } from "@reduxjs/toolkit";
import connectionService from "./connectionService";

const initialState = {
  connRequests: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

//RESET ALL STATES ON LOGOUT
export const revertAll = createAction("REVERT_ALL");

// SEND CONNECTION REQUEST
export const sendConnectionRequest = createAsyncThunk(
  "connRequest/sndReq",
  async (hId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      return await connectionService.sendConnectionRequest(hId, token);
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

export const connectionSlice = createSlice({
  name: "connRequest",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendConnectionRequest.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(sendConnectionRequest.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.connRequests.push(action.payload);
      })
      .addCase(sendConnectionRequest.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(revertAll, () => initialState);
  },
});

export const { reset } = connectionSlice.actions;
export default connectionSlice.reducer;
