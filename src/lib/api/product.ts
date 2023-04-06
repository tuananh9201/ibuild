import { ResponseSearchProduct, SearchProduct } from "src/lib/types";
import axios from "./api";
import { Product } from "src/lib/types";

export const searchProduct = async (
  payload: SearchProduct
): Promise<ResponseSearchProduct> => {
  try {
    const res = await axios.post("/products/", payload);
    return res.data?.data || [];
  } catch (error) { }
  return {
    paging: {
      limit: payload.limit,
      skip: payload.skip,
      total: 0,
    },
    data: [],
  };
};

export const getProductDetail = async (id: string) => {
  try {
    const res = await axios.get(`/products/${id}`)
    return res?.data?.data || []
  } catch (error) {
    console.warn(error)
    return error
  }
}

export const getListMostRelevantProduct = async (payload: { product_name: string, product_id: string, skip: number, limit: number }): Promise<Product[]> => {
  try {
    const res = await axios.get(`/products/most-relevant/?product_name=${payload.product_name}&product_id=${payload.product_id}&skip=${payload.skip}&limit=${payload.limit}`)
    return res.data?.data?.data || []
    return []
  } catch (error) {
    console.warn(error)
    return []
  }
}
