import { User } from "src/lib/types";
import api from "./api";

export const authWithAccessToken = async (): Promise<User | undefined> => {
  const resp = await api.get("/users/me");
  if (resp.status === 200) {
    const user = resp.data.data;
    return user;
  }
  throw "Not authenticated";
};

export const validateEmailExists = async (data: {
  email: string;
}): Promise<boolean> => {
  const resp = await api.post("/users/email", data);
  if (resp.status === 200) {
    const isValid = resp.data.data?.status || false;
    return isValid;
  }
  throw "Error";
};

export const addProductFavorite = async (productId: string) => {
  try {
    const res = await api.post('/bookmark', { product_id: productId })
    return res
  } catch (err) {
    console.log(err)
    return false
  }
}
