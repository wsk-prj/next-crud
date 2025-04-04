"use client";

import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

const api = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (err) => {
    throw new Error(`요청 설정 중 에러가 발생했습니다: ${err}`);
  }
);

export default api;
