/** @format */

import axios from "axios";

const API_URL = "/api/connection/";

const removeCon = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(API_URL + "removeFrnd/" + id, config);

  return response.data;
};

const removeConService = {
  removeCon,
};
export default removeConService;
