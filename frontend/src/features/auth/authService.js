//for http request and local storage

import axios from "axios";

const API_URL = "/api/users/";
const API = axios.create({ baseURL: "http://localhost:8000" });
//Register user

const register = async (userData) => {
  const response = await API.post(API_URL, userData);

  //axios puts the response into an object called data

  if (response?.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response?.data;
};

const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  logout,
};

export default authService;
