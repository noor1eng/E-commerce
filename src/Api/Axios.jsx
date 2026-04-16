import axios from "axios";
import { mainPath } from "./Api";
import Cookie from "cookie-universal";

const cookie = Cookie();

export const Axios = axios.create({
  baseURL: mainPath,
});

Axios.interceptors.request.use(
  (config) => {
    const token = cookie.get("e-commerce");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);
