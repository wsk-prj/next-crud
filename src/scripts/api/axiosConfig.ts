import axios from "axios";
import { getAccessToken, setAccessToken } from "@/scripts/storage/tokenStore";
import { routes } from "@/utils/routes";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

instance.interceptors.request.use((config) => {
  const accessToken = getAccessToken();
  if (accessToken) {
    const header = `Bearer ${accessToken}`;
    config.headers.Authorization = header;
  }
  return config;
});

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 401 Unauthorized
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const csrfToken = error.response?.data?.data?.token;
        const response = await axios.get(routes.api.v0.auth.refresh.uri(), {
          headers: { "x-csrf-token": csrfToken },
          withCredentials: true,
        });

        const newAccessToken = response.data?.data?.token;
        if (newAccessToken) {
          setAccessToken(newAccessToken);
          const header = `Bearer ${newAccessToken}`;
          originalRequest.headers["Authorization"] = header;
          return instance(originalRequest);
        }
      } catch (error) {
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

export default instance;
