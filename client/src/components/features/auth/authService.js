/** @format */

//FOR MAKING HTTP REQUEST AND SEETING DATA IN LOCAL STORAGE
import axios from "axios";
// import { reset } from "../actions/actions";

const API_URL = "/api/user/";

//Register user
const register = async (userData) => {
  const response = await axios.post(API_URL + "register", userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

//Login user
const login = async (userData) => {
  const response = await axios.post(API_URL + "auth", userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

// Logout user
const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  login,
  logout,
};

export default authService;
