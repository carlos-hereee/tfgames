import axios from "axios";

export let accessToken = localStorage.getItem("access-token");
export const axiosWithAuth = axios.create({
  baseURL: process.env.REACT_APP_DB_BASE_URL,
  withCredentials: true,
  headers: {
    "Access-Control-Allow-Origin": "http://localhost:3000",
  },
});
export const axiosWithOutAuth = axios.create({
  baseURL: process.env.REACT_APP_DB_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
  },
});

axiosWithAuth.interceptors.request.use(
  async (config) => {
    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  },
  (err) => Promise.reject(err)
);
