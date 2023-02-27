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
      if (expires && expires !== "None") {
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

export const passwordRecovery = async (
  email: string
): Promise<{ status: boolean; message?: string; expires?: number }> => {
  try {
    const res = await api.post(`password-recovery/${email}`);
    return {
      message: res.data?.data?.message,
      status: true,
    };
  } catch (error: any) {
    const statusCode = error?.response?.status;
    if (statusCode === 429) {
      return {
        expires: error?.response?.data?.expires,
        status: false,
      };
    }
    return { status: false };
  }
};

export const verifyPasswordRecoveryCode = async (params: {
  code: string;
  email: string;
}) => {
  try {
    const res = await api.post("/verify-password-recovery-code", params);
    if (res?.status === 200) {
      return true;
    }
  } catch (error: any) {
    const statusCode = error?.response?.status;
    if (statusCode === 400) {
      notification.error({
        description: error?.response?.data?.message || "Có lỗi xảy ra",
        message: "Lỗi",
        duration: 2,
      });
    }
    return false;
  }
};

export const resetPassword = async (params: {
  code: string;
  email: string;
  new_password: string;
}) => {
  try {
    const res = await api.post("/reset-password", params);
    return res;
  } catch (error: any) {
    const statusCode = error?.response?.status;
    if (statusCode === 400) {
      notification.error({
        description: error?.response?.data?.message || "Có lỗi xảy ra",
        message: "Lỗi",
        duration: 2,
      });
    }
  }
};
