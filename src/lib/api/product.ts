import { ResponseSearchProduct, SearchProduct } from "src/lib/types";
import axios from "./api";

export const searchProduct = async (
  payload: SearchProduct
): Promise<ResponseSearchProduct> => {
  try {
    const res = await axios.post("/products/", payload);
    console.log(res);
    return res.data?.data || [];
  } catch (error) {}
  return {
    paging: {
      limit: payload.limit,
      skip: payload.skip,
      total: 0,
    },
    data: [],
  };
};
