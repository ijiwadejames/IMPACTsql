import { createSlice, createAction, createAsyncThunk } from "@reduxjs/toolkit";
import rejectFriendService from "./rejectFriendService";
// import revertAll from "../actions/actions";

const initialState = {
  rejectFrnds: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};
export const revertAll = createAction("REVERT_ALL");
export const rejectFriend = createAsyncThunk(
  "friend/reject",
  async (dId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      return await rejectFriendService.rejectFriend(dId, token);
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

export const rejectFriendSlice = createSlice({
  name: "rejectFrnd",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(rejectFriend.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(rejectFriend.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.rejectFrnds = state.rejectFrnds.filter(
          (rejectFrnd) => rejectFrnd.id !== action.payload.id
        );
      })
      .addCase(rejectFriend.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(revertAll, () => initialState);
  },
});

export const { reset } = rejectFriendSlice.actions;
export default rejectFriendSlice.reducer;
