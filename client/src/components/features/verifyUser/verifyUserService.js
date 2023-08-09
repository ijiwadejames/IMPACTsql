/** @format */

import axios from "axios";

const API_URL = "/api/user/";

//mark message as read
const verifyUser = async (key) => {
  const response = await axios.post(API_URL + "verify-account/" + key);

  return response.data;
};

const verifyUserService = {
  verifyUser,
};
export default verifyUserService;
