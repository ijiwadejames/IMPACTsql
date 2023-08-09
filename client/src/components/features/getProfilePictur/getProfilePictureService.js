/** @format */

// import axios from "axios";

// const API_URL = "/api/profile/";

// // UPDATE PROFESSIONAL PROFILE
// const getProfilePicture = async (imageId, token) => {
//   const config = {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   };
//   try {
//     const response = await axios.get(API_URL + "getProfilePicture/" + imageId, config);
//     return response.data;

//   } catch (error) {
//     console.log(error);
//   }
// };

// // const getProfilePicture = async (imageId, token) => {

// //   const config = {
// //     headers: {
// //       Authorization: `Bearer ${token}`,
// //     },
// //     responseType: "arraybuffer",
// //   };
// //   try {
// //     const { data } = await axios.get(
// //       API_URL + "getProfilePicture/" + imageId,
// //       config
// //     );
// //     const imageBuffer = Buffer.from(data.avatar.data, "binary");
// //     const imageBlob = new Blob([imageBuffer], { type: "image/jpg" });
// //     return URL.createObjectURL(imageBlob);
// //   } catch (error) {
// //     console.log(error);
// //   }
// // };
// const getProfilePictureService = {
//   getProfilePicture,
// };

// export default getProfilePictureService;
