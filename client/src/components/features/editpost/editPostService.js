/** @format */

import axios from "axios";

const API_URL = "/api/post/";

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

const editPostService = {
  editPost,
};
export default editPostService;
