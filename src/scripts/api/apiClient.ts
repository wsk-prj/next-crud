import api from "./axiosConfig";
import { ApiResponse } from "./types/ApiResponse";
import { AxiosRequestConfig, AxiosResponse } from "axios";

export const apiClient = async <T, U>(
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE",
  data?: T,
  config?: AxiosRequestConfig
): Promise<AxiosResponse<U>> => {
  const response = await api.request<U>({
    url,
    method,
    data,
    ...config,
  });
  return response;
};

export const GET = <U = ApiResponse>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<U>> => {
  return apiClient<undefined, U>(url, "GET", undefined, config);
};

export const POST = <T, U = ApiResponse>(
  url: string,
  data: T,
  config?: AxiosRequestConfig
): Promise<AxiosResponse<U>> => {
  return apiClient<T, U>(url, "POST", data, config);
};

export const PUT = <T, U = ApiResponse>(
  url: string,
  data: T,
  config?: AxiosRequestConfig
): Promise<AxiosResponse<U>> => {
  return apiClient<T, U>(url, "PUT", data, config);
};

export const DELETE = <U = ApiResponse>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<U>> => {
  return apiClient<undefined, U>(url, "DELETE", undefined, config);
};
