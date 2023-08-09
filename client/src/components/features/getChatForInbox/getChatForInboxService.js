/** @format */

import axios from "axios";

const API_URL = "/api/messaging/";

//Get Message to Display on Read
const getChatsTitle = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL + "getChats", config);

  return response.data;
};

const getChats = {
  getChatsTitle,
};

export default getChats;
