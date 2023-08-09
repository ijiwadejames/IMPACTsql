/** @format */

//Send Message

import axios from "axios";

const API_URL = "/api/messaging/";

const sendMessage = async (messageData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(
    API_URL + "sendMessage",
    messageData,
    config
  );

  return response.data;
};

const getMessage = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + "getMessage", config);

  return response.data;
};

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
  sendMessage,
  getMessage,
  readMessage,
};

export default handleMessages;
