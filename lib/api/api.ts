import axios, { AxiosError, AxiosRequestConfig } from "axios";
axios.defaults.baseURL = process.env.NEXT_PUBLIC_BASE_URL;

export const setToken = (access_token: string) => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
};

const onRequest = (config: AxiosRequestConfig): AxiosRequestConfig => {
  // add something configs
  return config;
};

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  // add some handle
  return Promise.reject(error);
};
axios.interceptors.request.use(onRequest, onRequestError);

export default axios;
