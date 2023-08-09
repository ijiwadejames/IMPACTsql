/** @format */

import axios from "axios";

const API_URL = "/api/messaging/";

//Get Message to Display on Read
const readMessage = async (pid, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL + "getReadMessage/" + pid, config);

  return response.data;
};

const handleMessages = {
  readMessage,
};

export default handleMessages;
