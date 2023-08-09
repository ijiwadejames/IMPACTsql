/** @format */

import axios from "axios";

const API_URL = "/api/post/";

//get notification
const emptyNotify = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(API_URL + "emptyNotification", config);

  return response.data;
};

const emptyNotifyService = {
  emptyNotify,
};

export default emptyNotifyService;
