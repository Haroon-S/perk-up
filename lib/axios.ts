import axios from "axios";
import { useAuthStore } from "@/src/store/authStore";
import { getCookie } from "@/src/utilities/cookiesHelpers";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

axiosInstance.interceptors.request.use((config) => {
  let token = useAuthStore.getState().accessToken;

  if (!token) {
    try {
      token = localStorage.getItem("access_token");
    } catch {
      // Storage restricted in Safari
    }
  }

  if (!token) {
    token = getCookie("access_token");
  }

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

axiosInstance.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().logout();
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
