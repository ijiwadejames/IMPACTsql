import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import reactionService from "./reactionService";

const initialState = {
  reacts: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

//like post
export const likes = createAsyncThunk(
  "react/like",
  async (formData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      return await reactionService.likes(formData, token);
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

export const reactionSlice = createSlice({
  name: "react",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(likes.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(likes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.reacts.push(action.payload);
      })
      .addCase(likes.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = reactionSlice.actions;
export default reactionSlice.reducer;
