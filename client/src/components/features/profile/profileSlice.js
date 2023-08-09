import { createSlice, createAction, createAsyncThunk } from "@reduxjs/toolkit";
import profileService from "./profileSevice";
// import revertAll from "../actions/actions";

const initialState = {
  profiles: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

//RESET ALL STATES ON LOGOUT
export const revertAll = createAction("REVERT_ALL");

// GET USER PROFILE
export const getProfile = createAsyncThunk(
  "profile/getMe",
  async (_, thunkAPI) => {
    try {   
        if(thunkAPI.getState().auth.user){
          const token = thunkAPI.getState().auth.user.token
          return await profileService.getProfile(token);      
        } else {
          return ""
        }
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

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.profiles = action.payload;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(revertAll, () => initialState);
  },
});

export const { reset } = profileSlice.actions;
export default profileSlice.reducer;
