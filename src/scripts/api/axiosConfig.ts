import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

const instance = axios.create({
  baseURL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
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
      localStorage.removeItem("token");
      alert("로그인이 필요한 기능입니다. 로그인 화면으로 이동합니다.");
      window.location.href = "/auth/login";
      return;
    }
    console.log("[axiosConfig] error: ", error.response);
    if (error.response.status >= 500) {
      alert("서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
      return Promise.reject(error);
    }
    if (error.response.status >= 400) {
      alert("잘못된 요청입니다. 다시 시도해주세요.");
      return Promise.reject(error);
    }
  }
);

export default instance;
