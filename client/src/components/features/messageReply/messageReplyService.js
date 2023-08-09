/** @format */

import axios from "axios";

const API_URL = "/api/messaging/";

//POST REPLY
const replyMsg = async (formData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL + "replyMsg", formData, config);

  return response.data;
};

const messageReplyService = {
  replyMsg,
};

export default messageReplyService;
