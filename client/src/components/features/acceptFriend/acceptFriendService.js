/** @format */

import axios from "axios";

const API_URL = "/api/connection/";

const acceptFriend = async (fId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL + "acceptRequest", fId, config);
};

const acceptFriendService = {
  acceptFriend,
};

export default acceptFriendService;
