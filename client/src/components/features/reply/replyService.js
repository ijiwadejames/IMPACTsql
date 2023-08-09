/** @format */

import axios from "axios";

const API_URL = "/api/commentsandlikes/";

//REPLY TO A COMMENT
const replyComment = async (userData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(
    API_URL + "handlecomment",
    userData,
    config
  );

  return response.data;
};

const replyService = {
  replyComment,
};

export default replyService;
