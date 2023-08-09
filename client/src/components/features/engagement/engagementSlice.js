import { createSlice, createAction, createAsyncThunk } from "@reduxjs/toolkit";
import engagementService from "./engagementService";
// import revertAll from "../actions/actions";

const initialState = {
  postEngs: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

//RESET ALL STATES ON LOGOUT
export const revertAll = createAction("REVERT_ALL");


//update Personal Profile
export const postEngagement = createAsyncThunk(
  "postEng/update",
  async (pstID, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      return await engagementService.postEngagement(pstID, token);
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

export const emgagementSlice = createSlice({
  name: "postEng",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(postEngagement.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(postEngagement.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.postEngs.push(action.payload);
      })
      .addCase(postEngagement.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(revertAll, () => initialState);
  },
});

export const { reset } = emgagementSlice.actions;
export default emgagementSlice.reducer;
