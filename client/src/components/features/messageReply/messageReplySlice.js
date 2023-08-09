import { createSlice, createAction, createAsyncThunk } from "@reduxjs/toolkit";
import messageReplyService from "./messageReplyService";
// import revertAll from "../actions/actions";

const initialState = {
  msgReplys: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

//RESET ALL STATES ON LOGOUT
export const revertAll = createAction("REVERT_ALL");

//create reply

export const replyMsg = createAsyncThunk(
  "msgReply/Reply",
  async (formData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      return await messageReplyService.replyMsg(formData, token);
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

export const messageReplySlice = createSlice({
  name: "msgReply",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(replyMsg.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(replyMsg.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.msgReplys.push(action.payload);
      })
      .addCase(replyMsg.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(revertAll, () => initialState);
  },
});

export const { reset } = messageReplySlice.actions;
export default messageReplySlice.reducer;
