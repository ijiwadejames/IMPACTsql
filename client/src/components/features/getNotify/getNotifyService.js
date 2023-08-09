/** @format */

import axios from "axios";

const API_URL = "/api/post/";

//get notification
const getNotification = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL + "getNotify", config);

  return response.data;
};

const getNotifyService = {
  getNotification,
};

export default getNotifyService;
