import { createSlice, createAction, createAsyncThunk } from "@reduxjs/toolkit";
import menteeProfileService from "./menteesProfileService";
// import revertAll from "../actions/actions";

const initialState = {
  mProfiles: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

//RESET ALL STATES ON LOGOUT
export const revertAll = createAction("REVERT_ALL");

// GET MENTEES PROFILE
export const getMenteesProfile = createAsyncThunk(
  "mprofile/getMe",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      return await menteeProfileService.getMenteesProfile(token);
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

export const menteesProfileSlice = createSlice({
  name: "mprofile",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMenteesProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMenteesProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.mProfiles = action.payload;
      })
      .addCase(getMenteesProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(revertAll, () => initialState);
  },
});

export const { reset } = menteesProfileSlice.actions;
export default menteesProfileSlice.reducer;
