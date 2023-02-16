import { User } from "lib/types";
import api from "./api";

export const authWithAccessToken = async (): Promise<User | undefined> => {
  const resp = await api.get("/users/me");
  if (resp.status === 200) {
    const user = resp.data.data;
    return user;
  }
};
