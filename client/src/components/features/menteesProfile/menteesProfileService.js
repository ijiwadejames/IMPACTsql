/** @format */

import axios from "axios";

const API_URL = "/api/profile/";

//Get all mentees profile
const getMenteesProfile = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL + "menteesProfile", config);

  return response.data;
};

const menteeProfileService = {
  getMenteesProfile,
};

export default menteeProfileService;
