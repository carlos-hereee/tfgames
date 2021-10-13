import axios from "axios";

export let accessToken = "";
export const setAccessToken = (str) => {
  accessToken = str;
};
export const axiosWithAuth = axios.create({
  baseURL: process.env.REACT_APP_DB_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
    Authorization: `bearer ${accessToken}`,
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
