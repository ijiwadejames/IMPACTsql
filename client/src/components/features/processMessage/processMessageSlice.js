import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import processMessageService from "./processMessageService";

const initialState = {
  sendMails: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

// GET USER PROFILE
export const sendMail = createAsyncThunk(
  "confirm/sendMail",
  async (formData, thunkAPI) => {
    try {
      return await processMessageService.sendMail(formData);
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

export const processMessageSlice = createSlice({
  name: "sendMail",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendMail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(sendMail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.sendMails.push(action.payload);
      })
      .addCase(sendMail.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = processMessageSlice.actions;
export default processMessageSlice.reducer;
