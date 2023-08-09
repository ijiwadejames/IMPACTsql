import { createSlice, createAction, createAsyncThunk } from "@reduxjs/toolkit";
import friendService from "./friendService";
// import revertAll from "../actions/actions";

const initialState = {
  myFriends: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

//RESET ALL STATES ON LOGOUT
export const revertAll = createAction("REVERT_ALL");

export const friends = createAsyncThunk(
  "friend/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      return await friendService.friends(token);
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

export const friendSlice = createSlice({
  name: "friend",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(friends.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(friends.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.myFriends = action.payload;
      })
      .addCase(friends.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(revertAll, () => initialState);
  },
});

export const { reset } = friendSlice.actions;
export default friendSlice.reducer;
