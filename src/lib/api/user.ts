
import { User } from "src/lib/types";
import { SearchResultModel } from "../models";
import api from "./api";

export const authWithAccessToken = async (): Promise<User | undefined> => {
  const resp = await api.get("/users/me");
  if (resp.status === 200) {
    const user = resp.data.data;
    // set user type to localStorage
    if (user.user_type && !localStorage.getItem("user_type")) {
      localStorage.setItem("user_type", user.user_type);
    }
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
    const res = await api.post("/bookmark", { product_id: productId })
    return res
  } catch (err) {
    console.warn(err)
    return false
  }
}

export const getSearchHistories = async (): Promise<SearchResultModel[]> => {
  try {
    const res = await api.get("/search-history")
    return res.data?.data?.data || []
  } catch (error) {
    console.warn(error)
    return []
  }
}

export const createSearchHistory = async (keyword: string) => {
  try {
    await api.post("/search-history", { keyword })
  } catch (error) {
    console.warn(error)
  }
}

export const deleteSearchHistory = async (id: string) => {
  try {
    await api.delete(`/search-history/${id}`)
  } catch (error) {
    console.warn(error)
  }
}

export const changePasswordByToken = async (payload: { current_password: string, new_password: string }) => {
  try {
    const res = await api.put('/users/change-password/', payload)
    return res
  } catch (error: any) {
    console.warn(error)
    return error?.response?.data
  }
}
