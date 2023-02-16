import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { message } from "antd";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});
// axios.defaults.baseURL = process.env.NEXT_PUBLIC_BASE_URL;

export const setToken = (access_token: string) => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
};

const onRequest = (config: AxiosRequestConfig): AxiosRequestConfig => {
  // add something configs
  return config;
};

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  // add some handle
  console.log("===================");
  console.log(error);
  if (error.response && error.response.data) {
    const errorMessage = error.response.data?.message;
    const errorCode = error.response.status;
    message.error(`${errorCode} - ${errorMessage}`);
  }
  return Promise.reject(error);
};
api.interceptors.request.use(onRequest);
api.interceptors.response.use((response) => response, onRequestError);
export default api;
