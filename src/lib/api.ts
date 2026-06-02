import axios from "axios";
import { getItem, deleteItem } from "./storage";

const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  timeout: 10000,
});

api.interceptors.request.use(async (config) => {
  const token = await getItem("jwt_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    if (error.response?.status === 401) {
      await deleteItem("jwt_token");
    }
    return Promise.reject(error);
  }
);

export default api;
