/** @format */

import axios from "axios";

const API_URL = "/api/profile/";

//Get connection Profile
const getConnectionProfile = async (pid, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(
    API_URL + "connectionProfile/" + pid,
    config
  );

  return response.data;
};

const connectionProfileService = {
  getConnectionProfile,
};

export default connectionProfileService;
