/** @format */

import axios from "axios";

const API_URL = "/api/engagement/";

const postEngagement = async (pstID, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL + "add", pstID, config);

  return response.data;
};

const engagementService = {
  postEngagement,
};

export default engagementService;
