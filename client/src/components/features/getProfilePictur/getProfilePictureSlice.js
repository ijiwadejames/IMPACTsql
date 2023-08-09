// import { createSlice, createAction, createAsyncThunk } from "@reduxjs/toolkit";
// import getProfilePictureService from "./getProfilePictureService";
// // import revertAll from "../actions/actions";

// const initialState = {
//   getProPics: {},
//   isLoading: false,
//   isSuccess: false,
//   isError: false,
//   message: "",
// };

// //RESET ALL STATES ON LOGOUT
// export const revertAll = createAction("REVERT_ALL");

// //get profile picture
// export const getProfilePicture = createAsyncThunk(
//   "profile/picture",
//   async (imageId, thunkAPI) => {
//     try {
//       const token = thunkAPI.getState().auth.user.token;

//       return await getProfilePictureService.getProfilePicture(imageId, token);
//     } catch (error) {
//       const message =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString();

//       return thunkAPI.rejectWithValue(message);
//     }
//   }
// );

// export const getProfilePictureSlice = createSlice({
//   name: "getProPic",
//   initialState,
//   reducers: {
//     reset: (state) => initialState,
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(getProfilePicture.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(getProfilePicture.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.isSuccess = true;
//         state.getProPics = action.payload;
//       })
//       .addCase(getProfilePicture.rejected, (state, action) => {
//         state.isLoading = false;
//         state.isError = true;
//         state.message = action.payload;
//       })
//       .addCase(revertAll, () => initialState);
//   },
// });

// export const { reset } = getProfilePictureSlice.actions;
// export default getProfilePictureSlice.reducer;
