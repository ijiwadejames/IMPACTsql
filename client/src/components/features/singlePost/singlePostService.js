/** @format */

import axios from "axios";

const API_URL = "/api/post/";

//get notification
const singlePost = async (pstId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL + "singlePost/" + pstId, config);

  return response.data;
};

const singlePostService = {
  singlePost,
};

export default singlePostService;
