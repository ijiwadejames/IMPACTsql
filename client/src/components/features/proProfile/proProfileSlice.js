import { createSlice, createAction, createAsyncThunk } from "@reduxjs/toolkit";
import proProfileService from "./proProfileService";
// import revertAll from "../actions/actions";

const initialState = {
  proProfiles: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

//RESET ALL STATES ON LOGOUT
export const revertAll = createAction("REVERT_ALL");


//update Professional Profile
export const updateProfessionalProfile = createAsyncThunk(
  "profile/updatePro",
  async (userData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      return await proProfileService.updateProfessionalProfile(userData, token);
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

export const proProfileSlice = createSlice({
  name: "proProfile",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateProfessionalProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProfessionalProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.proProfiles.push(action.payload);
      })
      .addCase(updateProfessionalProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(revertAll, () => initialState);
  },
});

export const { reset } = proProfileSlice.actions;
export default proProfileSlice.reducer;
