import { createSlice, createAction, createAsyncThunk } from "@reduxjs/toolkit";
import profilePictureService from "./profilePictureService";
// import revertAll from "../actions/actions";

const initialState = {
  profilePics: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

//RESET ALL STATES ON LOGOUT
export const revertAll = createAction("REVERT_ALL");

//update Personal Profile
export const updateProfilePicture = createAsyncThunk(
  "profilePic/update",
  async (formData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      return await profilePictureService.updateProfilePicture(formData, token);
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

export const profilePictureSlice = createSlice({
  name: "profilePic",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateProfilePicture.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProfilePicture.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.profilePics.push(action.payload);
      })
      .addCase(updateProfilePicture.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(revertAll, () => initialState);
  },
});

export const { reset } = profilePictureSlice.actions;
export default profilePictureSlice.reducer;
