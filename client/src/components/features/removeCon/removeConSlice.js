import { createSlice, createAction, createAsyncThunk } from "@reduxjs/toolkit";
import removeConService from "./removeConService";
// import revertAll from "../actions/actions";

const initialState = {
  removeCons: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const revertAll = createAction("REVERT_ALL");

export const removeCon = createAsyncThunk(
  "removeCon/remove",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      return await removeConService.removeCon(id, token);
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

export const removeConSlice = createSlice({
  name: "removeCon",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(removeCon.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeCon.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.removeCons.push(action.payload);
      })
      .addCase(removeCon.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(revertAll, () => initialState);
  },
});

export const { reset } = removeConSlice.actions;
export default removeConSlice.reducer;
