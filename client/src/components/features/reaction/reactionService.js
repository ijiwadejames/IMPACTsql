/** @format */

import axios from "axios";

const API_URL = "/api/commentsandlikes/";

//HANDLE LIKES
const likes = async (formData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL + "likes", formData, config);

  return response.data;
};

const reactionService = {
  likes,
};

export default reactionService;
