/** @format */

import axios from "axios";

const API_URL = "/api/messaging/";

//DeletePOst Posts
const deleteMessage = async (uId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(API_URL + "deleteMsgs/" + uId, config);

  return response.data;
};

const deleteMessageService = {
  deleteMessage,
};
export default deleteMessageService;
