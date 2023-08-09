import { createSlice, createAction, createAsyncThunk } from "@reduxjs/toolkit";
import perProfileService from "./perProfileService";
// import revertAll from "../actions/actions";

const initialState = {
  perProfiles: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

//RESET ALL STATES ON LOGOUT
export const revertAll = createAction("REVERT_ALL");

//update Personal Profile
export const updateProfile = createAsyncThunk(
  "perProfile/update",
  async (userData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      return await perProfileService.updateProfile(userData, token);
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

export const perProfileSlice = createSlice({
  name: "perProfile",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.perProfiles.push(action.payload);
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(revertAll, () => initialState);
  },
});

export const { reset } = perProfileSlice.actions;
export default perProfileSlice.reducer;
