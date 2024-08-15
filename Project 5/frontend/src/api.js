import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000/api",
});

API.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem("ideasharing-user"));
  if (user) {
    config.headers.Authorization = `Bearer ${user.access}`;
  }
  return config;
});

export default API;
