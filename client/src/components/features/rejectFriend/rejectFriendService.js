/** @format */

import axios from "axios";

const API_URL = "/api/connection/";

const rejectFriend = async (dId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + "removeRequest/" + dId, config);

  return response.data;
};

const rejectFriendService = {
  rejectFriend,
};

export default rejectFriendService;
