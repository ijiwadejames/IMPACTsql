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
  const response = await axios.post(API_URL + "createpost", postData, config);

  return response.data;
};

//edit post
const editPost = async (editData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL + "editpost/", editData, config);

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

//Get Personal Posts
const getPersonalPosts = async (pid, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL + "getpersonalpost/" + pid, config);

  return response.data;
};

const postService = {
  createPost,
  getPosts,
  getPersonalPosts,
  editPost,
};
export default postService;
