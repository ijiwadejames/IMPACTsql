import { createAsyncThunk, createAction, createSlice } from "@reduxjs/toolkit";
import countNotifyService from "./countNotifyService";

const initialState = {
  notifys: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

//RESET ALL STATES ON LOGOUT
export const revertAll = createAction("REVERT_ALL");


//GET CONNECTION LIST

export const countNotification = createAsyncThunk(
  "notify/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      return await countNotifyService.countNotification(token);
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

export const countNotifySlice = createSlice({
  name: "notify",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(countNotification.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(countNotification.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.notifys = action.payload;
      })
      .addCase(countNotification.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(revertAll, () => initialState);
  },
});

export const { reset } = countNotifySlice.actions;
export default countNotifySlice.reducer;
