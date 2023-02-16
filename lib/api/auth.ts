import { User } from "lib/types";
import axios from "./api";

export const register = async (credentials: {
  email: string;
  password: string;
}): Promise<User | undefined> => {
  const resp = await axios.post("/auth/register", credentials);
  if (resp.status === 200) {
    const { user, access_token } = resp.data.data;
    return { ...user, access_token };
  }
};
