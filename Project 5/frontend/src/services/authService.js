import axios from "axios";

const API_URL = "http://localhost:8000/api/";

const register = (username, email, password) => {
  return axios.post(API_URL + "register", {
    username,
    email,
    password,
  });
};

const login = async (username, password) => {
  const response = await axios.post(API_URL + "token", {
    username,
    password,
  });
  if (response.data.access) {
    localStorage.setItem("ideasharing-user", JSON.stringify(response.data));
  }
  return response.data;
};

const logout = () => {
  localStorage.removeItem("ideasharing-user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("ideasharing-user"));
};

const authService = { login, logout, getCurrentUser, register };

export default authService;
