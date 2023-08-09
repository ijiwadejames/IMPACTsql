import { createSlice, createAction, createAsyncThunk } from "@reduxjs/toolkit";
import editPostService from "./editPostService";
// import revertAll from "../actions/actions";

const initialState = {
  editPosts: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

//RESET ALL STATES ON LOGOUT
export const revertAll = createAction("REVERT_ALL");

//edit post
export const editPost = createAsyncThunk(
  "editPost/edit",
  async (editData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      return await editPostService.editPost(editData, token);
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

export const editPostSlice = createSlice({
  name: "editPost",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(editPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.editPosts.push(action.payload);
      })
      .addCase(editPost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(revertAll, () => initialState);
  },
});

export const { reset } = editPostSlice.actions;
export default editPostSlice.reducer;
