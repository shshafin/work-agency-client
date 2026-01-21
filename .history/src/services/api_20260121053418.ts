import axios from "axios";

const api = axios.create({
  baseURL: process.cwd().includes("localhost")
    ? "http://localhost:5000/api/v1"
    : "https://your-production-url.com/api/v1", // তোমার ব্যাকএন্ড URL
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
