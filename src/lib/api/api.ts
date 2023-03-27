import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosRequestHeaders,
  AxiosHeaders,
} from "axios";
import { message } from "antd";
import { store } from "../../store/store";
import { unAuthorized } from "../../store/features/auth/auth";

// interface CustomAxiosRequestHeaders extends AxiosRequestHeaders {
//   Authorization: string;
// }
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});
// axios.defaults.baseURL = process.env.NEXT_PUBLIC_BASE_URL;

export const setToken = (access_token: string) => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
};

const onRequest = (config: AxiosRequestConfig): AxiosRequestConfig => {
  // add something configs
  try {
    const token = localStorage.getItem("access_token");
    if (token) {
      const mHeaders = AxiosHeaders.from({
        Authorization: `Bearer ${token}`,
      }) as AxiosRequestHeaders;
      config.headers = mHeaders;
    }
  } catch (error) {}
  return config;
};

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  // add some handle

  if (error.response && error.response.data) {
    // const errorMessage = error.response.data?.message;
    const errorCode = error.response.status;
    if (errorCode === 401) {
      message.error(
        `Phiên đăng nhập của bạn đã hết hạn, vui lòng đăng nhập lại.`
      );
      const { dispatch } = store;
      dispatch(unAuthorized());
    }
    // else if (errorCode === 400) {
    //   message.error(`${errorCode} - ${errorMessage}`);
    // }
  }
  return Promise.reject(error);
};
api.interceptors.request.use(onRequest);
// api.interceptors.response.use((response) => response, onRequestError);

export default api;
