import { ResponseSearchProduct, SearchProduct } from "src/lib/types";
import axios from "./api";

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
  console.log(id)
  try {
    const res = await axios.get(`/products/${id}`)
    return res?.data?.data || []
  } catch (error) {
    console.log(error)
    return error
  }
}
