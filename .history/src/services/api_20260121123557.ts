import axios from "axios";

const api = axios.create({
  baseURL: process.cwd().includes("localhost")
    ? "https://work-agency-server.onrender.com/"
    : "https://work-agency-server.onrender.com/",

  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("auth-storage")
      ? JSON.parse(localStorage.getItem("auth-storage")!).state.token
      : null;

    if (token) {
      config.headers.Authorization = `${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default api;
