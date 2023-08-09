/** @format */

import axios from "axios";

const API_URL = "/api/connection/";

//sEND cONNECTION rEQUEST
const cancelReq = async (cId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(API_URL + "cancelRequest/" + cId, config);

  return response.data;
};

const connectionService = {
  cancelReq,
};

export default connectionService;
