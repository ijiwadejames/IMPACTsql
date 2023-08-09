import { createAsyncThunk, createAction, createSlice } from "@reduxjs/toolkit";
import verifyUserService from "./verifyUserService";

const initialState = {
  verifys: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

//RESET ALL STATES ON LOGOUT
export const revertAll = createAction("REVERT_ALL");


//get read message
export const verifyUser = createAsyncThunk(
  "user/verify",
  async (key, thunkAPI) => {
    try {
      return await verifyUserService.verifyUser(key);
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

export const verifyUserSlice = createSlice({
  name: "verify",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
       .addCase(verifyUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(verifyUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.verifys = action.payload;
      })
      .addCase(verifyUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.verifys = null;
      })
      .addCase(revertAll, () => initialState);
  },
});

export const { reset } = verifyUserSlice.actions;
export default verifyUserSlice.reducer;
