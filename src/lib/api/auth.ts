import { AxiosError } from "axios";
import api from "./api";
import { message } from "antd";

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
      message.error(msgText);
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
      message.error(msgText);
    }
  }
};

export const passwordRecovery = async (
  email: string
): Promise<{
  status: boolean;
  message?: string;
  expires?: number;
  attemp?: number;
}> => {
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
        attemp: error?.response?.data?.attemp,
      };
    }
    if (statusCode === 400) {
      message.error(error?.response?.data?.message);
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
      message.error(error?.response?.data?.message || "Có lỗi xảy ra");
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
      message.error(error?.response?.data?.message || "Có lỗi xảy ra");
    }
  }
};

export const authWithSocialAccessToken = async (params: {
  accessToken: string;
  authProvider: string;
}) => {
  try {
    const res = await api.post("/auth/verify-social-token", {
      access_token: params.accessToken,
      auth_provider: params.authProvider,
    });
    return res;
  } catch (error: any) {
    const statusCode = error?.response?.status;
    if (statusCode === 400) {
      message.error(error?.response?.data?.message || "Có lỗi xảy ra");
    }
  }
};

export const registerWithPhoneNumber = async (phoneNumber: string) => {
  try {
    const res = await api.post("/auth/register-with-phone", {
      phone_number: phoneNumber,
    });
    return res;
  } catch (error: any) {
    const statusCode = error?.response?.status;
    if (statusCode === 400) {
      message.error(error?.response?.data?.message || "Có lỗi xảy ra");
    }
  }
};

export const verifySMSOTP = async (payload: {
  otp: string;
  phoneNumber: string;
}) => {
  try {
    const res = await api.post("/auth/verify_sms_otp", {
      phone_number: payload.phoneNumber,
      otp_code: payload.otp,
    });
    return res;
  } catch (error: any) {
    const statusCode = error?.response?.status;
    if (statusCode === 400) {
      message.error(error?.response?.data?.message || "Có lỗi xảy ra");
    }
  }
};
