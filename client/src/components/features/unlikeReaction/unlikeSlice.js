import { createSlice, createAction, createAsyncThunk } from "@reduxjs/toolkit";
import unlikeService from "./unlikeService";

const initialState = {
  unlikes: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const revertAll = createAction("REVERT_ALL");
//unlike post
export const unlike = createAsyncThunk(
  "react/unlike",
  async (formData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      return await unlikeService.unlike(formData, token);
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

export const unlikeSlice = createSlice({
  name: "unlike",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder

      .addCase(unlike.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(unlike.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.unlikes.push(action.payload);
      })
      .addCase(unlike.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(revertAll, () => initialState);
  },
});

export const { reset } = unlikeSlice.actions;
export default unlikeSlice.reducer;
