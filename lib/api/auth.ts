import api from "./api";

export const register = async (credentials: {
  email: string;
  password: string;
}): Promise<string | undefined> => {
  const resp = await api.post("/auth/register", credentials);
  if (resp.status === 200) {
    const { access_token } = resp.data.data;
    return access_token;
  }
};
