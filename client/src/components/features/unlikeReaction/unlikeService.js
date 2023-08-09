/** @format */

import axios from "axios";

const API_URL = "/api/commentsandlikes/";

const unlike = async (formData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL + "unlike", formData, config);

  return response.data;
};

const unlikeService = {
  unlike,
};

export default unlikeService;
