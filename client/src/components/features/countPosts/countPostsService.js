/** @format */

import axios from "axios";

const API_URL = "/api/post/";

//count posts
const countMyPosts = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL + "countPosts", config);

  return response.data;
};

const countPostsService = {
  countMyPosts,
};

export default countPostsService;
