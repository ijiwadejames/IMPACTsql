/** @format */

import axios from "axios";

const API_URL = "/api/messaging/";

//mark message as read
const markRead = async (mid, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL + "isRead", mid, config);

  return response.data;
};

const mrService = {
  markRead,
};
export default mrService;
