import axios from "axios";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

instance.interceptors.response.use(
  (response) => {
    console.log("[axiosConfig] response: ", response);
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      console.log("[axiosConfig] Authorization error: ", error.response);
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("userInfo");
      return Promise.reject(error);
    }
    console.log("[axiosConfig] error: ", error.response);
    return Promise.reject(error);
  }
);

export default instance;
