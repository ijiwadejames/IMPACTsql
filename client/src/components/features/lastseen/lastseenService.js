/** @format */

import axios from "axios";

const API_URL = "/api/profile/";

//edit post
const lastseen = async (dateData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL + "lastseen", dateData, config);

  return response.data;
};

const lastseenService = {
  lastseen,
};
export default lastseenService;
