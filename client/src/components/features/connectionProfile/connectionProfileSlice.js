import { createSlice, createAction, createAsyncThunk } from "@reduxjs/toolkit";
import connectionProfileService from "./connectionProfileService";

const initialState = {
  conProfiles: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

// GET CONNECTION PROFILE
export const getConnectionProfile = createAsyncThunk(
  "conProfiles/getConProfile",
  async (pid, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      return await connectionProfileService.getConnectionProfile(pid, token);
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


//RESET ALL STATES ON LOGOUT
export const revertAll = createAction("REVERT_ALL");



export const connectionProfileSlice = createSlice({
  name: "conProfile",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getConnectionProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getConnectionProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.conProfiles = action.payload;
      })
      .addCase(getConnectionProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(revertAll, () => initialState);
  },
});

export const { reset } = connectionProfileSlice.actions;
export default connectionProfileSlice.reducer;
