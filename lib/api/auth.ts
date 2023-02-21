import { AxiosError } from "axios";
import api from "./api";
import { message, notification } from "antd";

export const register = async (credentials: {
  email: string;
  password: string;
}): Promise<string | undefined> => {
  try {
    const resp = await api.post("/auth/register", credentials);
    if (resp.status === 200) {
      const { access_token } = resp.data.data;
      return access_token;
    }
  } catch (error: any) {
    const status_code = error.response?.status;
    if (status_code === 400) {
      const msgText = error.response.data?.message;
      notification.error({
        description: msgText,
        message: "Lỗi",
        duration: 2,
      });
    }
  }
};

export const loginApi = async (credentials: {
  email: string;
  password: string;
}): Promise<
  { message?: string; expires?: string; access_token?: string } | undefined
> => {
  const body = new FormData();
  body.append("username", credentials.email);
  body.append("password", credentials.password);
  body.append("grant_type", "");
  body.append("scope", "");
  body.append("client_id", "");
  body.append("client_secret", "");
  try {
    const resp = await api.post("/auth/access-token", body, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (resp.status === 200) {
      const { access_token } = resp.data.data;
      return { access_token };
    }
  } catch (error: any) {
    const status_code = error.response?.status;
    if (status_code === 400) {
      const msgText = error.response.data?.message;
      const expires = error.response.data?.expires;
      if (expires) {
        return error.response.data;
      }
      notification.error({
        description: msgText,
        message: "Lỗi",
        duration: 2,
      });
    }
  }
};
