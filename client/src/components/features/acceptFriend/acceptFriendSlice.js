import { createSlice, createAction, createAsyncThunk } from "@reduxjs/toolkit";
import acceptFriendService from "./acceptFriendService";
// import revertAll from "../actions/actions";

const initialState = {
  acceptFrnds: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};
export const revertAll = createAction("REVERT_ALL");
export const acceptFriend = createAsyncThunk(
  "acceptfrnd/Accept",
  async (fId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      return await acceptFriendService.acceptFriend(fId, token);
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

export const acceptFriendSlice = createSlice({
  name: "acceptfrnd",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(acceptFriend.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(acceptFriend.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.acceptFrnds.push(action.payload);
      })
      .addCase(acceptFriend.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(revertAll, () => initialState);
  },
});

export const { reset } = acceptFriendSlice.actions;
export default acceptFriendSlice.reducer;
