import { createAsyncThunk, createAction, createSlice } from "@reduxjs/toolkit";
import getConnectionRequestService from "./getConnectionRequestService";
// import revertAll from "../actions/actions";

const initialState = {
  connLists: [],
  isPending: false,
  isSuccess: false,
  isError: false,
  message: "",
};

//RESET ALL STATES ON LOGOUT
export const revertAll = createAction("REVERT_ALL");


//GET CONNECTION LIST

export const getConnectionList = createAsyncThunk(
  "connList/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      return await getConnectionRequestService.getConnectionList(token);
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

export const getConnectionRequestSlice = createSlice({
  name: "connList",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getConnectionList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getConnectionList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.connLists = action.payload;
      })
      .addCase(getConnectionList.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(revertAll, () => initialState);
  },
});

export const { reset } = getConnectionRequestSlice.actions;
export default getConnectionRequestSlice.reducer;
