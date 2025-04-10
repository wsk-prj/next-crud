import axios from "axios";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      await axios.get("/api/v0/auth/refresh", { withCredentials: true });
      return instance(error.config);
    }
    return Promise.reject(error);
  }
);

export default instance;
