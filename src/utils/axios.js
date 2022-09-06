import axios from "axios";

export let accessToken = localStorage.getItem("access-token");
export const axiosWithAuth = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? process.env.REACT_APP_DB_BASE_URL_PRODUCTION
      : process.env.REACT_APP_DB_BASE_URL,
  withCredentials: true,
  headers: {
    "Access-Control-Allow-Origin": process.env.REACT_APP_CLIENT_BASE_URL,
  },
});
export const axiosWithOutAuth = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? process.env.REACT_APP_DB_BASE_URL_PRODUCTION
      : process.env.REACT_APP_DB_BASE_URL,
  headers: {
    "Access-Control-Allow-Origin": process.env.REACT_APP_CLIENT_BASE_URL,
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
