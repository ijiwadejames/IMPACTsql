import { createAsyncThunk, createAction, createSlice } from "@reduxjs/toolkit";
import mrService from "./mrService";

const initialState = {
  isReads: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

//RESET ALL STATES ON LOGOUT
export const revertAll = createAction("REVERT_ALL");


//get read message
export const markRead = createAsyncThunk(
  "message/getmarkRead",
  async (mid, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      return await mrService.markRead(mid, token);
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

export const mrSlice = createSlice({
  name: "isRead",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(markRead.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(markRead.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.messages = action.payload;
      })
      .addCase(markRead.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isReads.push(action.payload);
      })
      .addCase(revertAll, () => initialState);
  },
});

export const { reset } = mrSlice.actions;
export default mrSlice.reducer;
