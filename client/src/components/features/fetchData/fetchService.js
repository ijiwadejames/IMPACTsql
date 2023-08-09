/** @format */

import axios from "axios";

const API_URL = "/api/post/";

//Get User and Friends Posts
const fetchPosts = async (limit, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL + "getpost/" + limit, config);

  return response.data;
};

const fetchService = {
  fetchPosts,
};
export default fetchService;
