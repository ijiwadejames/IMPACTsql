import { createSlice, createAction, createAsyncThunk } from "@reduxjs/toolkit";
import replyService from "./replyService";
// import revertAll from "../actions/actions";

const initialState = {
  replys: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const revertAll = createAction("REVERT_ALL");

//send reply
export const replyComment = createAsyncThunk(
  "reply/create",
  async (userData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      return await replyService.replyComment(userData, token);
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

export const replySlice = createSlice({
  name: "reply",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(replyComment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(replyComment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.replys.push(action.payload);
      })
      .addCase(replyComment.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(revertAll, () => initialState);
  },
});

export const { reset } = replySlice.actions;
export default replySlice.reducer;
