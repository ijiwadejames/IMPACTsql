/** @format */

import axios from "axios";

const API_URL = "/api/profile/";

//UPDATE PERSONAL PROFILE
const updateProfilePicture = async (formData, token) => {
  // const config = {

  // };
  const response = await axios.post(
    API_URL + "uploadProfilePicture",
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
      transformRequest: (formData) => formData,
    }
  );

  return response.data;
};

const profilePictureService = {
  updateProfilePicture,
};

export default profilePictureService;
