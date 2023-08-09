/** @format */

import axios from "axios";

const API_URL = "/api/connection/";

//sEND cONNECTION rEQUEST
const sendConnectionRequest = async (hId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL + "handleConnection", hId, config);

  return response.data;
};

const connectionService = {
  sendConnectionRequest,
};

export default connectionService;
