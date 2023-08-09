import { createSlice, createAction, createAsyncThunk } from "@reduxjs/toolkit";
import connectionService from "./connectionService";
// import revertAll from "../actions/actions";

const initialState = {
  cancelReqs: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

//RESET ALL STATES ON LOGOUT
export const revertAll = createAction("REVERT_ALL");

// CANCEL CONNECTION REQUEST
export const cancelReq = createAsyncThunk(
  "connRequest/cancelReq",
  async (cId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      return await connectionService.cancelReq(cId, token);
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
  name: "cancelReq",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(cancelReq.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(cancelReq.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.cancelReqs = state.cancelReqs.filter(
          (cancelReq) => cancelReq.id !== action.payload.id
        );
      })
      .addCase(cancelReq.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(revertAll, () => initialState);
  },
});

export const { reset } = connectionSlice.actions;
export default connectionSlice.reducer;
