/** @format */

import axios from "axios";

const API_URL = "/api/post/";

//DeletePOst Posts
const deletePost = async (pstID, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(API_URL + "deletepost/" + pstID, config);

  return response.data;
};

const delPostService = {
  deletePost,
};
export default delPostService;
