import { createSlice, createAction, createAsyncThunk } from "@reduxjs/toolkit";
import lastseenService from "./lastseenService";
// import revertAll from "../actions/actions";

const initialState = {
  lastseens: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

//RESET ALL STATES ON LOGOUT
export const revertAll = createAction("REVERT_ALL");

//update lastseen
export const lastseen = createAsyncThunk(
  "lastseen/update",
  async (dateData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      return await lastseenService.lastseen(dateData, token);
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

export const lastseenSlice = createSlice({
  name: "lastseen",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(lastseen.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(lastseen.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.lastseens.push(action.payload);
      })
      .addCase(lastseen.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(revertAll, () => initialState);
  },
});

export const { reset } = lastseenSlice.actions;
export default lastseenSlice.reducer;
