/** @format */

import axios from "axios";

const API_URL = "/api/profile/";

//UPDATE PERSONAL PROFILE
const updateProfile = async (userData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL + "update", userData, config);

  return response.data;
};

const perProfileService = {
  updateProfile,
};

export default perProfileService;
