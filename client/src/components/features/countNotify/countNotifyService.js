/** @format */

import axios from "axios";

const API_URL = "/api/post/";

//get notification
const countNotification = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL + "countNotification", config);

  return response.data;
};

const countNotifyService = {
  countNotification,
};

export default countNotifyService;
