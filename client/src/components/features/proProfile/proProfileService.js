/** @format */

import axios from "axios";

const API_URL = "/api/profile/";

//UPDATE PROFESSIONAL PROFILE
const updateProfessionalProfile = async (userData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL + "updateProf", userData, config);

  return response.data;
};

const proProfileService = {
  updateProfessionalProfile,
};

export default proProfileService;
