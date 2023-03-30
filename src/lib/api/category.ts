import { ICategory } from "src/lib/types";
import axios from "./api";
import categories from "@/data/categories.json";

export const fetchRootCategories = async (): Promise<ICategory[]> => {
  try {
    const res = await axios.get("/product-category/roots/");
    const data = res?.data;
    return data?.data || [];
  } catch (error) {
    console.log(error);
  }
  return [];
};

export const fetchCategorySlug = async (
  slug: string
): Promise<ICategory | undefined> => {
  try {
    const res = await axios.get(`/product-category/by-slug/${slug}`);
    const data = res?.data?.data || [];
    return data;
  } catch (error) {
    console.warn(error);
  }
};

export const fetchChildsCategories = async (parentId: string) => {
  console.log("load categories by parent " + parentId);
  return fetch(`/api/fake/categories/${parentId}`)
    .then((res) => res.json())
    .catch(() => {
      return [];
    });
};
