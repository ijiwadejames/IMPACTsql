/** @format */

import axios from "axios";

const API_URL = "/api/post/";
//Add new post
const createPost = async (postData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(
    API_URL + "createtextpost",
    postData,
    config
  );

  return response.data;
};

//Get User and Friends Posts
const getPosts = async (limit, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL + "getpost/" + limit, config);

  return response.data;
};

const postService = {
  createPost,
  getPosts,
};
export default postService;
