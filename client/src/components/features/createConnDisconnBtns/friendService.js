/** @format */

import axios from "axios";

const API_URL = "/api/connection/";

const friendsBtn = async (pid, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + "getFriends/" + pid, config);

  return response.data;
};

const friendService = {
  friendsBtn,
};

export default friendService;
