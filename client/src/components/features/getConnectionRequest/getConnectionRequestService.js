/** @format */

import axios from "axios";

const API_URL = "/api/connection/";

//Get connection Profile
const getConnectionList = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL + "getRequest", config);

  return response.data;
};

const getConnectionRequestService = {
  getConnectionList,
};

export default getConnectionRequestService;
