import { createSlice, createAction, createAsyncThunk } from "@reduxjs/toolkit";
import emptyNotifyService from "./emptyNotifyService";

const initialState = {
  emptyNotifys: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const revertAll = createAction("REVERT_ALL");
//empty notification
export const emptyNotify = createAsyncThunk(
  "notify/empty",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      return await emptyNotifyService.emptyNotify(token);
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

export const emptyNotifySlice = createSlice({
  name: "emptyNotify",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder

      .addCase(emptyNotify.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(emptyNotify.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.emptyNotifys.push(action.payload);
      })
      .addCase(emptyNotify.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(revertAll, () => initialState);
  },
});

export const { reset } = emptyNotifySlice.actions;
export default emptyNotifySlice.reducer;
