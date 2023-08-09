/** @format */

import axios from "axios";

const API_URL = "/api/connection/";

const friends = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + "myFriends", config);

  return response.data;
};

const friendService = {
  friends,
};

export default friendService;
