/** @format */

import axios from "axios";

const API_URL = "/api/messaging/";

//Get Message to Display on Read
const lastMessage = async (pid, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL + "lastMessage/" + pid, config);

  return response.data;
};

const getLastMessage = {
  lastMessage,
};

export default getLastMessage;
