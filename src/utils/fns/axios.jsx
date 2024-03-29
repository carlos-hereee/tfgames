import axios from "axios";

export let accessToken = localStorage.getItem("access-token");

export const setLocalStorage = (data) => {
  localStorage.setItem("tf-games-nickname", data.user.nickname);
  localStorage.setItem("tf-games-uid", data.user.uid);
};

export const axiosWithAuth = axios.create({
  baseURL: import.meta.env.VITE_DB_BASE_URL,
  withCredentials: true,
  headers: {
    "Access-Control-Allow-Origin": import.meta.env.VITE_CLIENT_BASE_URL,
    "Content-Type": "application/json; charset=utf-8",
    Accept: "application/json",
  },
});
export const axiosWithOutAuth = axios.create({
  baseURL: import.meta.env.VITE_DB_BASE_URL,
  withCredentials: true,
  headers: {
    "Access-Control-Allow-Origin": import.meta.env.VITE_CLIENT_BASE_URL,
    "Content-Type": "application/json;charset=UTF-8",
    Accept: "application/json",
  },
});

// response interceptors =================================================
let isRefreshing = false;
let refreshSubscribers = [];
function subscribeTokenRefresh(cb) {
  refreshSubscribers.push(cb);
}

function onRrefreshed(accessToken) {
  refreshSubscribers.map((cb) => cb(accessToken));
}

axiosWithAuth.interceptors.request.use(
  async (config) => {
    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  },
  async (err) => {
    console.log("err", err);
    const { config, response } = err;
    const ogReq = config;
    if (response.status === 401) {
      if (!isRefreshing) {
        isRefreshing = true;
        const { data } = await axiosWithAuth.post("/users/refresh-token");
        onRrefreshed(data.accessToken);
        isRefreshing = false;
      }
      const retryOrigReq = new Promise((resolve, reject) => {
        subscribeTokenRefresh((access) => {
          // replace the expired accessToken and retry
          ogReq.headers["Authorization"] = "Bearer " + access;
          resolve(axios(ogReq));
        });
      });
      return retryOrigReq;
    } else {
      return Promise.reject(err);
    }
  }
);
